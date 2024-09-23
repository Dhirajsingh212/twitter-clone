"use client";
import { postTweet } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { findDiff } from "@/lib/utils";
import { Post } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PostsCard from "./PostsCard";
import SessionCheck from "./SessionCheck";
import Spinner from "./Spinner";
import { Skeleton } from "./ui/skeleton";
import { Image, Video } from "lucide-react";
import { Input } from "./ui/input";
import InputImage from "./InputImage";

const Feed = ({ dbPosts }: { dbPosts: Post[] }) => {
  const session = useSession();
  const [postText, setPostText] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([...dbPosts]);
  const [pollingPosts, setPollingPosts] = useState<Post[]>([...dbPosts]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setAllPosts([...dbPosts]);
  }, [dbPosts]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.get("/api/fetchtweet");
      if (response.data.allPosts) {
        setPollingPosts(response.data.allPosts);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [pollingPosts]);

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
          <SessionCheck
            Fallback={<Skeleton className="w-full h-40 rounded-lg" />}
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
              <CardFooter className="flex flex-col justify-between items-end">
                <div className="flex space-x-2">
                  {/* <InputImage /> */}
                  {/* <Button variant="ghost" size="sm">
                    <Video />
                  </Button> */}
                </div>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-400 "
                  disabled={isLoading}
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      if (postText.length === 0) {
                        toast.warning("Post cannot be empty.");
                        return;
                      }
                      await postTweet(
                        Number((session.data?.user as any).id),
                        postText
                      );
                      toast.success("Posted successfully.");
                      setPostText("");
                    } catch (err) {
                      console.log(err);
                      toast.error("Something went wrong");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {isLoading ? <Spinner /> : "Post"}
                </Button>
              </CardFooter>
            </Card>
          </SessionCheck>
          {findDiff(pollingPosts.length, allPosts.length) > 0 && (
            <button
              onClick={() => {
                setAllPosts([...pollingPosts]);
              }}
              className="border w-full border-blue-500 text-center mt-4 text-blue-500 py-2"
            >
              {findDiff(pollingPosts.length, allPosts.length)}
              <span className="pl-2">New posts.</span>
            </button>
          )}
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
                likes={post.likes}
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
