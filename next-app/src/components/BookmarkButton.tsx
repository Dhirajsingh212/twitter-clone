"use client";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { addBookmark } from "@/actions";

const BookmarkButton = ({ postId }: { postId: number }) => {
  const session = useSession();
  if (session.status === "loading" || session.status === "unauthenticated") {
    return null;
  }
  const userId = Number((session.data?.user as any).id);
  return (
    <Button
      onClick={async () => {
        try {
          if (await addBookmark(userId, postId)) {
            toast.success("added to bookmarks.");
          } else {
            toast.error("Something went wrong.");
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong.");
        }
      }}
      variant="ghost"
      size="sm"
      className="flex items-center"
    >
      <Bookmark className="size-4 " />
    </Button>
  );
};

export default BookmarkButton;
