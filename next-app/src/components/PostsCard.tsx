import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDateToHrsAgo } from "@/lib/date";
import { Post } from "@/types";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import Link from "next/link";
import CommentDialog from "./CommentDialog";
import LikeButton from "./LikeButton";
import SessionCheck from "./SessionCheck";
import ShareButton from "./ShareButton";
import { Skeleton } from "./ui/skeleton";

const PostsCard = ({ id, user, content, createdAt, _count, likes }: Post) => {
  return (
    <Card
      key={id}
      className="my-4 border-gray-200 dark:border-gray-800 max-w-full md:max-w-xl lg:max-w-2xl mx-auto"
    >
      <Link href={`/feed/${id}`}>
        <CardHeader className="flex flex-row items-center space-x-4 p-4">
          <Avatar>
            <AvatarImage src={`https://i.pravatar.cc/150?img=${id}`} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold text-sm sm:text-base lg:text-lg">
              {user.username}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              {formatDateToHrsAgo(createdAt)}
            </p>
          </div>
        </CardHeader>
      </Link>
      <p className="flex-wrap break-words p-6">{content}</p>
      <CardFooter className="flex justify-between items-center p-2 flex-wrap">
        <SessionCheck
          Fallback={<Skeleton className="w-full min-h-10 rounded-sm" />}
        >
          <CommentDialog postId={id} commentCount={_count.comments} />
          <LikeButton postId={id} likeCount={_count.likes} allLikes={likes} />
          <Button variant="ghost" size="sm" className="flex items-center">
            <ChartNoAxesColumnIncreasing className="size-4 " />
            <span className="pl-2 text-xs sm:text-sm lg:text-base">2.6K</span>
          </Button>
          <ShareButton id={id} />
        </SessionCheck>
      </CardFooter>
    </Card>
  );
};

export default PostsCard;
