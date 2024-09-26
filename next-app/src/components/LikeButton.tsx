"use client";
import { tweetLike } from "@/actions";
import { cn, compareLikeId } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
      <motion.div
        animate={{
          scale: isLiked ? [1, 1.2, 1] : 1,
          rotate: isLiked ? [0, -10, 10, 0] : 0,
        }}
        className="flex flex-row gap-2"
        transition={{ duration: 0.5 }}
      >
        <Heart
          className={cn("size-4", {
            "text-green-500 fill-green-500": isLiked,
          })}
        />
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold "
        >
          {likeCount}
        </motion.span>
      </motion.div>
    </Button>
  );
};

export default LikeButton;
