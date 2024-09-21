"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateToHrsAgo } from "@/lib/date";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import PostsCard from "./PostsCard";

interface Posts {
  id: number;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
  _count: {
    comments: number;
    likes: number;
  };
}

const ProfileTabs = ({ posts }: { posts: Posts[] }) => {
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
      <TabsContent value="posts" className="lg:p-4">
        <div className="space-y-4">
          {posts.length === 0 && <p>No posts found.</p>}
          {posts.map((tweet: Posts) => (
            <PostsCard
              key={tweet.id}
              id={tweet.id}
              content={tweet.content}
              createdAt={tweet.createdAt}
              updatedAt={tweet.updatedAt}
              userId={tweet.userId}
              user={{ username: "" }}
              _count={tweet._count}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent className="p-4" value="replies">
        Replies content
      </TabsContent>
      <TabsContent className="p-4" value="media">
        Media content
      </TabsContent>
      <TabsContent className="p-4" value="likes">
        Likes content
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
