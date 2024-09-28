"use client";
import { postTweet } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { findDiff, uploadImages } from "@/lib/utils";
import { Post } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ComingSoonCard from "./ComingSoonCard";
import InputImage from "./InputImage";
import PostsCard from "./PostsCard";
import SessionCheck from "./SessionCheck";
import Spinner from "./Spinner";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import ScrollToTop from "./ScrollToTop";

const Feed = ({ dbPosts }: { dbPosts: Post[] }) => {
  const session = useSession();
  const [postText, setPostText] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([...dbPosts]);
  const [pollingPosts, setPollingPosts] = useState<Post[]>([...dbPosts]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const router = useRouter();
  const divRef = useRef<any>();

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
          ref={divRef}
          className="h-[86vh] overflow-y-scroll no-scrollbar"
        >
          <SessionCheck
            Fallback={<Skeleton className="w-full h-40 rounded-lg" />}
          >
            <Card className="bg-transparent shadow-none border-2">
              <CardHeader>
                <div className="flex space-x-4">
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
              <div className="px-6">
                <InputImage images={images} setImages={setImages} />
              </div>
              <CardFooter className="flex flex-col justify-between items-end p-6">
                <div className="flex space-x-2 self-start"></div>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-400"
                  disabled={isLoading}
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      if (postText.length === 0) {
                        toast.error("Post cannot be empty.");
                        return;
                      }

                      let urls: string[] = [];

                      if (images.length > 0) {
                        const imageResponse = await uploadImages(images);
                        urls = imageResponse.uploadedImagesData.map(
                          (element: any) => element.url
                        );
                      }

                      await postTweet(
                        Number((session.data?.user as any).id),
                        postText,
                        urls
                      );

                      toast.success("Posted successfully.");
                      setPostText("");
                      setImages([]);
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
                router.push("/feed");
                setAllPosts([...pollingPosts]);
              }}
              className="border w-full border-blue-500 text-center mt-4 text-blue-500 py-2"
            >
              <span className="pl-2">New posts.</span>
            </button>
          )}
          <div className="space-y-4 mt-4 ">
            {allPosts.length === 0 && (
              <p className="text-center">No posts found.</p>
            )}
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
                bookmarks={post.bookmarks}
                media={post.media}
              />
            ))}
          </div>
          <ScrollToTop divRef={divRef} />
        </TabsContent>
        <TabsContent value="following" className="min-h-[86vh]">
          <ComingSoonCard />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Feed;
