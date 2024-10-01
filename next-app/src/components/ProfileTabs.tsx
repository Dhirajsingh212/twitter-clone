"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/types";
import { useState } from "react";
import ComingSoonCard from "./ComingSoonCard";
import PostsCard from "./PostsCard";
import BlurFade from "./ui/blur-fade";

const ProfileTabs = ({ posts }: { posts: Post[] }) => {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="w-full justify-start border-b border-gray-200 dark:border-gray-700">
        <TabsTrigger value="posts" className="flex-1">
          Posts
        </TabsTrigger>
        <TabsTrigger value="replies" className="flex-1">
          Replies
        </TabsTrigger>
        <TabsTrigger value="media" className="flex-1">
          Media
        </TabsTrigger>
        <TabsTrigger value="likes" className="flex-1">
          Likes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="lg:py-4">
        <div className="space-y-4">
          <BlurFade>
            {posts.length === 0 && <p>No posts found.</p>}
            {posts.map((tweet: Post) => (
              <PostsCard
                key={tweet.id}
                id={tweet.id}
                content={tweet.content}
                createdAt={tweet.createdAt}
                updatedAt={tweet.updatedAt}
                userId={tweet.userId}
                user={tweet.user}
                _count={tweet._count}
                likes={tweet.likes}
                bookmarks={tweet.bookmarks}
                media={tweet.media}
              />
            ))}
          </BlurFade>
        </div>
      </TabsContent>
      <TabsContent className="p-4" value="replies">
        <ComingSoonCard />
      </TabsContent>
      <TabsContent className="p-4" value="media">
        <ComingSoonCard />
      </TabsContent>
      <TabsContent className="p-4" value="likes">
        <ComingSoonCard />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
