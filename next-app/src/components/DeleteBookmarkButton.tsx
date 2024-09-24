"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { deleteBookmarkById } from "@/actions";
import { useState } from "react";

const DeleteBookmarkButton = ({ bookmarkId }: { bookmarkId: number }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (session.status !== "authenticated") {
    return null;
  }

  const userId = Number((session.data.user as any).id);
  return (
    <Button
      disabled={isLoading}
      variant="ghost"
      onClick={async () => {
        try {
          setIsLoading(true);
          if (await deleteBookmarkById(userId, bookmarkId)) {
            toast.success("Removed.");
          } else {
            toast.error("Something went wrong");
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <Trash2 className="size-4 text-white"></Trash2>
    </Button>
  );
};

export default DeleteBookmarkButton;
