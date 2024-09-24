"use client";
import { followUser, unfollowUser } from "@/actions";
import { compareFollowerId } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const FollowButton = ({
  followId,
  followers,
}: {
  followId: number;
  followers: { followerId: number }[];
}) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (session.status === "loading") {
    return <Skeleton className="w-20 min-h-10 rounded-sm" />;
  }

  if (session.status === "unauthenticated") {
    return null;
  }

  const userId = Number((session.data?.user as any).id);

  return (
    <>
      {compareFollowerId(followers, userId) ? (
        <Button
          disabled={isLoading}
          variant="ghost"
          onClick={async () => {
            try {
              setIsLoading(true);
              if (await unfollowUser(followId, userId)) {
                toast.success("Unfollowed");
              } else {
                toast.error("Something went wrong");
              }
            } catch (err) {
              toast.error("Something went wrong");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Following
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          onClick={async () => {
            try {
              setIsLoading(true);
              if (await followUser(followId, userId)) {
                toast.success("Followed");
              } else {
                toast.error("Something went wrong");
              }
            } catch (err) {
              toast.error("Something went wrong");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
