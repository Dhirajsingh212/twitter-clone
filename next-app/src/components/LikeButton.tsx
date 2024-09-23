"use client";
import { tweetLike } from "@/actions";
import { cn, compareLikeId } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const LikeButton = ({
  postId,
  likeCount,
  allLikes,
}: {
  postId: number;
  likeCount: number;
  allLikes?: {
    tweetId: number;
    userId: number;
  }[];
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const session = useSession();
  const userId = Number((session.data?.user as any).id);

  useEffect(() => {
    if (compareLikeId(allLikes || [], userId)) {
      setIsLiked(true);
    }
  }, []);

  const handleClick = async () => {
    try {
      const userId = Number((session.data?.user as any).id);
      const like = await tweetLike(userId, postId);
      setIsLiked(like);
      toast.success("updted.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      <Heart
        size={18}
        className={cn({
          "text-green-500": isLiked,
        })}
      />
      <span className="pl-2">{likeCount}</span>
    </Button>
  );
};

export default LikeButton;
