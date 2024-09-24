import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { formatDateToHrsAgo } from "@/lib/date";
import { Bookmark } from "@/types";
import Link from "next/link";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import { cn } from "@/lib/utils";

const BookmarkCard = ({ id, user, content, createdAt }: Bookmark) => {
  return (
    <Card
      key={id}
      className={cn(
        "my-4 border-gray-200 dark:border-gray-800 max-w-full md:max-w-xl lg:max-w-2xl mx-auto"
      )}
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
        <p className="flex-wrap break-words p-6 line-clamp-4">{content}</p>
      </Link>
      <div className="flex flex-row justify-end pr-2 pb-2">
        <DeleteBookmarkButton bookmarkId={id} />
      </div>
    </Card>
  );
};

export default BookmarkCard;
