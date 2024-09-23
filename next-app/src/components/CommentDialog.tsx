"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { postComment } from "@/actions";

export default function CommentDialog({
  postId,
  commentCount,
}: {
  postId: number;
  commentCount: number;
}) {
  const [comment, setComment] = useState("");
  const session = useSession();

  const maxChars = 280;
  const remainingChars = maxChars - comment.length;

  if (session.status !== "authenticated") {
    return <Spinner />;
  }

  const submitHandler = async () => {
    try {
      const userId = Number((session.data.user as any).id);
      if (await postComment(userId, postId, comment)) {
        toast.success("Comment posted.");
        setComment("");
      } else {
        toast.error("Something went wrong please try again later.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to post comment.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MessageCircle className="size-4" />
          <span className="pl-2">{commentCount}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Add a comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="What's happening?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] resize-none focus-visible:ring-0"
            />
          </div>
          <div className="text-sm text-muted-foreground text-right">
            <span className={remainingChars < 0 ? "text-destructive" : ""}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={submitHandler}
            type="submit"
            disabled={comment.length === 0 || remainingChars < 0}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
