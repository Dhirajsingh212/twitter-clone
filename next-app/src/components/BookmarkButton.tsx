"use client";
import { addBookmark } from "@/actions";
import { compareBookmarksId } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const BookmarkButton = ({
  postId,
  allBookmarks,
}: {
  postId: number;
  allBookmarks?: {
    tweetId: number;
    userId: number;
  }[];
}) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const userId = Number((session.data?.user as any).id);

  useEffect(() => {
    if (session.status === "loading" || session.status === "unauthenticated") {
      return;
    }
    if (compareBookmarksId(allBookmarks || [], userId)) {
      setIsLiked(true);
    }
  }, [allBookmarks, userId]);

  if (session.status === "loading" || session.status === "unauthenticated") {
    return null;
  }

  return (
    <>
      {isLiked ? (
        <Button variant="ghost" size="sm">
          <Bookmark className="size-4 text-rose-500 fill-rose-500" />
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          onClick={async () => {
            try {
              setIsLoading(true);
              if (await addBookmark(userId, postId)) {
                toast.success("added to bookmarks.");
              } else {
                toast.error("Something went wrong.");
              }
            } catch (err) {
              console.log(err);
              toast.error("Something went wrong.");
            } finally {
              setIsLoading(false);
            }
          }}
          variant="ghost"
          size="sm"
          className="flex items-center"
        >
          <Bookmark className="size-4 " />
        </Button>
      )}
    </>
  );
};

export default BookmarkButton;
