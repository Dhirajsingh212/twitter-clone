"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateToHrsAgo } from "@/lib/date";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface Posts {
  id: number;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
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
      <TabsContent value="posts" className="p-4">
        <div className="space-y-4">
          {posts.length === 0 && <p>No posts found.</p>}
          {posts.map((tweet: Posts) => (
            <div
              key={tweet.id}
              className="px-2 border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <p>{tweet.content}</p>
              <div className="mt-2 text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>{formatDateToHrsAgo(tweet.createdAt)}</span>
                <div className="flex space-x-4">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {}}
                  >
                    <MessageCircle size={18} />
                    <span>replies</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <Heart size={18} />
                    <span>likes</span>
                  </button>
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {}}
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
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
