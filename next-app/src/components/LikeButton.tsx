"use client";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { isLikedByUser, tweetLike } from "@/actions";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LikeButton = ({
  postId,
  likeCount,
}: {
  postId: number;
  likeCount: number;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      isLikedByUser(Number((session.data?.user as any).id), postId)
        .then((res) => {
          setIsLiked(res || false);
        })
        .catch((err) => console.log(err));
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
