import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CardFooter, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

const PostDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>Post</DialogTrigger>
        <DialogContent>
          <CardHeader>
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's happening?"
                onChange={(e) => {}}
                className="resize-none focus-visible:ring-0 bg-gray-100 dark:bg-zinc-800 border-none"
              />
            </div>
          </CardHeader>
          <CardFooter className="flex justify-between items-center p-6">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                📷
              </Button>
              <Button variant="ghost" size="sm">
                🎥
              </Button>
              <Button variant="ghost" size="sm">
                📊
              </Button>
            </div>
            <Button onClick={() => {}}>Post</Button>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDialog;
