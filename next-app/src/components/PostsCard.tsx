import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDateToHrsAgo } from "@/lib/date";
import {
  ChartNoAxesColumnIncreasing,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

interface Post {
  id: number;
  user: {
    username: string;
  };
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
}

const PostsCard = ({
  id,
  user,
  content,
  createdAt,
  updatedAt,
  userId,
}: Post) => {
  return (
    <Card
      key={id}
      className="bg-white dark:bg-black border-gray-200 dark:border-gray-800"
    >
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
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <MessageCircle size={18} />
          <span className="pl-2">3</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Heart size={18} />
          <span className="pl-2">5</span>
        </Button>
        <Button variant="ghost" size="sm">
          <ChartNoAxesColumnIncreasing size={18} />
          <span className="pl-2">2.6K</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostsCard;
