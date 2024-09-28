"use client";
import { deleteTweet } from "@/actions";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const DeleteButton = ({ id, postId }: { id: number; postId: number }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (session.status === "loading" || isLoading) {
    return <Skeleton className="w-20 h-10" />;
  }

  if (session.status === "unauthenticated") {
    return null;
  }

  return (
    <>
      {Number((session.data?.user as any).id) === id && (
        <Button
          disabled={isLoading}
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={async () => {
            setIsLoading(true);
            try {
              const success = await deleteTweet(postId);
              if (success) {
                toast.success("Deleted.");
                router.push("/feed");
                return;
              }
              toast.error("Something went wrong.");
            } catch (err) {
              console.error("Error deleting tweet:", err);
              toast.error("Something went wrong.");
            } finally {
              setIsLoading(false);
            }
          }}
          aria-label="Delete comment"
        >
          <Trash2 className="size-4 text-rose-500" />
        </Button>
      )}
    </>
  );
};

export default DeleteButton;
