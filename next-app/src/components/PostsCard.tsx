import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDateToHrsAgo } from "@/lib/date";
import { Post } from "@/types";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import CommentDialog from "./CommentDialog";
import CustomImage from "./CustomImage";
import LikeButton from "./LikeButton";
import SessionCheck from "./SessionCheck";
import ShareButton from "./ShareButton";
import { Skeleton } from "./ui/skeleton";

const PostsCard = ({
  id,
  user,
  content,
  createdAt,
  _count,
  likes,
  bookmarks,
  media,
}: Post) => {
  return (
    <Card
      key={id}
      className="my-4 border-gray-200 dark:border-gray-800 w-full mx-auto"
    >
      <Link href={`/feed/${id}`}>
        <CardHeader className="flex flex-row items-center space-x-4 p-4">
          <Avatar>
            <AvatarImage className="object-cover" src={user.profilePic} />
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
        <p className="flex-wrap break-words p-6 line-clamp-4 text-lg sm:text-lg">
          {content}
        </p>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
          {media &&
            media.map((element, index) => {
              return (
                <CustomImage
                  key={index}
                  src={element.url}
                  customStyle="h-full w-full rounded-lg object-cover"
                />
                // <Image
                //   key={index}
                //   height={100}
                //   width={100}
                //   alt=""
                //   src={element.url}
                //   className="h-full w-full rounded-lg object-cover"
                // ></Image>
              );
            })}
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center p-2 flex-wrap">
        <LikeButton postId={id} likeCount={_count.likes} allLikes={likes} />
        <CommentDialog postId={id} commentCount={_count.comments} />
        <SessionCheck
          Fallback={<Skeleton className="w-10 min-h-10 rounded-sm" />}
        >
          <BookmarkButton postId={id} allBookmarks={bookmarks} />
        </SessionCheck>
        <ShareButton id={id} />
      </CardFooter>
    </Card>
  );
};

export default PostsCard;
