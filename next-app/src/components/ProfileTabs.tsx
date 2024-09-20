"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

const mockTweets = [
  {
    id: 1,
    content:
      "Just launched a new project! Check it out at example.com #webdev #launch",
    likes: 150,
    reposts: 50,
    replies: 25,
    timestamp: "2h",
  },
  {
    id: 2,
    content:
      "Excited to speak at the upcoming tech conference next month! Who else is going? #techconf",
    likes: 200,
    reposts: 75,
    replies: 40,
    timestamp: "5h",
  },
  {
    id: 3,
    content:
      "Learning a new programming language is always an adventure. Currently diving into Rust! #coding #rust",
    likes: 180,
    reposts: 60,
    replies: 30,
    timestamp: "1d",
  },
];

const ProfileTabs = () => {
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
          {mockTweets.map((tweet) => (
            <div
              key={tweet.id}
              className="px-2 border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <p>{tweet.content}</p>
              <div className="mt-2 text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>{tweet.timestamp}</span>
                <div className="flex space-x-4">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {}}
                  >
                    <MessageCircle size={18} />
                    <span>{tweet.replies}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <Heart size={18} />
                    <span>{tweet.likes}</span>
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
