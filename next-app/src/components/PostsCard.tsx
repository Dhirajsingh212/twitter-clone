import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
    <Card key={id} className="my-4  border-gray-200 dark:border-gray-800">
      <Link href={`/feed/${id}`}>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage src={`https://i.pravatar.cc/150?img=${id}`} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.username}</p>
            <p className="text-gray-400">{formatDateToHrsAgo(createdAt)}</p>
          </div>
        </CardHeader>
        <CardContent className="max-w-xl">
          <p className="flex-wrap break-words w-full">{content}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <SessionCheck
          Fallback={<Skeleton className="w-full min-h-10 rounded-sm" />}
        >
          <CommentDialog postId={id} commentCount={_count.comments} />
          <LikeButton postId={id} likeCount={_count.likes} allLikes={likes} />
          <Button variant="ghost" size="sm">
            <ChartNoAxesColumnIncreasing size={18} />
            <span className="pl-2">2.6K</span>
          </Button>
          <ShareButton id={id} />
        </SessionCheck>
      </CardFooter>
    </Card>
  );
};

export default PostsCard;
