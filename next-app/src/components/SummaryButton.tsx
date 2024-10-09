"use client";
import { addSummary } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { ScrollArea } from "./ui/scroll-area";

export default function SummaryButton({
  summary,
  postId,
  content,
}: {
  summary: string;
  postId: number;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [summaryState, setSummaryState] = useState(summary);
  const [isLoading, setIsLoading] = useState(false);

  async function clickHandler() {
    if (summaryState && summaryState.length > 0) {
      setIsOpen(true);
      return;
    }
    try {
      setIsLoading(true);
      setIsOpen(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/summary`,
        {
          text: content,
        }
      );

      if (response.statusText != "OK") {
        throw new Error("Error fetching data:");
      }

      const body = response.summary_text;

      if (!body) {
        toast.error("Failed to fetch summary.");
        return;
      }

      setSummaryState(body);

      if (await addSummary(postId, body)) {
        toast.success("Saved to db");
      }

      toast.success("Summary generated");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button variant="ghost" disabled={isLoading} onClick={clickHandler}>
          <Lightbulb className="size-4" />
        </Button>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-blue-700">
              Here is your summary.
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-6 space-y-6">
            {isLoading ? (
              <Spinner />
            ) : (
              <ScrollArea className="h-60 border rounded-lg p-2 border-gray-300 dark:border-gray-700">
                <p className="text-lg text-start text-gray-700 dark:text-white">
                  {summaryState}
                </p>
              </ScrollArea>
            )}
            <Button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Close Dialog
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
