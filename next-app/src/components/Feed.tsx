"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PostsCard from "./PostsCard";
import Spinner from "./Spinner";

interface Post {
  id: number;
  user: {
    username: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  _count: {
    comments: number;
    likes: number;
  };
}

const Feed = ({ dbPosts }: { dbPosts: any }) => {
  const session = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [postText, setPostText] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([...dbPosts]);

  useEffect(() => {
    if (session.status === "authenticated") {
      const token = ((session as any).data?.user as any).jwtToken;
      const newSocket = new WebSocket(
        `ws://localhost:8080?token=${encodeURIComponent(token)}`
      );

      newSocket.onopen = () => {
        // toast.success("Connection established.");
        setSocket(newSocket);
      };

      newSocket.onmessage = (message) => {
        const parsedData = JSON.parse(message.data || "");
        setAllPosts((prev) => {
          return [parsedData, ...prev];
        });
      };

      newSocket.onclose = (event) => {
        // toast.error("Disconnected. Please reload the page.");
      };

      return () => {
        newSocket.close();
      };
    }
  }, [session.status]);

  if (session.status !== "authenticated") {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!socket) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

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
          <Card className="bg-transparent shadow-none border-2">
            <CardHeader>
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="What's happening?"
                  value={postText}
                  onChange={(e) => {
                    setPostText(e.target.value);
                  }}
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
              <Button
                onClick={() => {
                  if (postText.length === 0) {
                    toast.warning("post cannot be empty.");
                    return;
                  }
                  socket.send(postText);
                  toast.success("Message posted.");
                  setPostText("");
                }}
              >
                Post
              </Button>
            </CardFooter>
          </Card>
          <div className="space-y-4 mt-4 ">
            {allPosts.map((post, index) => (
              <PostsCard
                key={index}
                id={post.id}
                user={post.user}
                content={post.content}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                userId={post.userId}
                _count={post._count}
              />
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
