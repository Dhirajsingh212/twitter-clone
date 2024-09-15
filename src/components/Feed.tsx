import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const Feed = () => {
  return (
    <main className="lg:w-1/2 border-x border-y py-2 rounded-lg border-gray-200 dark:border-gray-800 px-4 ">
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="for-you">For you</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent
          value="for-you"
          className="h-[86vh] overflow-y-scroll no-scrollbar"
        >
          <Card className="bg-transparent  shadow-none border-2">
            <CardHeader>
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="What's happening?"
                  className="resize-none focus-visible:ring-0 bg-gray-100 dark:bg-zinc-800 border-none"
                />
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
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
              <Button>Post</Button>
            </CardFooter>
          </Card>
          <div className="space-y-4 mt-4 ">
            {[1, 2, 3].map((post) => (
              <Card
                key={post}
                className="bg-white dark:bg-black border-gray-200 dark:border-gray-800"
              >
                <CardHeader className="flex space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${post}`}
                    />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">User Name</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @username
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    This is a sample post content. It can be much longer and may
                    include hashtags or mentions.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    💬 3
                  </Button>
                  <Button variant="ghost" size="sm">
                    🔁 5
                  </Button>
                  <Button variant="ghost" size="sm">
                    ❤️ 10
                  </Button>
                  <Button variant="ghost" size="sm">
                    📊 2.5K
                  </Button>
                  <Button variant="ghost" size="sm">
                    📤
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="following" className="min-h-[86vh]">
          <p className="text-center py-4">
            Content from accounts you follow will appear here.
          </p>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Feed;
