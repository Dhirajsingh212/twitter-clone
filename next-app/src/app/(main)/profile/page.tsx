"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  LinkIcon,
  MapPinIcon,
  MessageCircle,
  Repeat2,
  Heart,
  Share2,
  Sun,
  Moon,
} from "lucide-react";

// Mock data
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

const trendingTopics = [
  { id: 1, name: "#WebDev", tweets: "125K" },
  { id: 2, name: "React 18", tweets: "75K" },
  { id: 3, name: "#AINews", tweets: "50K" },
];

const suggestedUsers = [
  {
    id: 1,
    name: "Jane Smith",
    username: "@janesmith",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Alex Johnson",
    username: "@alexj",
    avatar: "/placeholder.svg?height=50&width=50",
  },
];

export default function FullXProfile() {
  const [tweets, setTweets] = useState(mockTweets);
  const [newTweet, setNewTweet] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleTweetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTweet.trim()) {
      const tweet = {
        id: tweets.length + 1,
        content: newTweet,
        likes: 0,
        reposts: 0,
        replies: 0,
        timestamp: "now",
      };
      setTweets([tweet, ...tweets]);
      setNewTweet("");
    }
  };

  const handleLike = (id: number) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  const handleRepost = (id: number) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, reposts: tweet.reposts + 1 } : tweet
      )
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex">
        <div className="flex-grow max-w-2xl border-x border-gray-200 dark:border-gray-700">
          {/* Theme Toggle */}
          <div className="p-4 flex justify-end">
            <Button onClick={toggleTheme} variant="outline" size="icon">
              {isDarkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Profile Header */}
          <div className="relative">
            <img
              src="/placeholder.svg?height=200&width=600"
              alt="Profile banner"
              className="w-full h-48 object-cover"
            />
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Profile picture"
              className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
            />
          </div>

          {/* Profile Info */}
          <div className="mt-16 px-4">
            <div className="flex justify-end mb-4">
              <Button variant="outline" className="mr-2">
                Message
              </Button>
              <Button>Follow</Button>
            </div>
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">@johndoe</p>
            <p className="mt-2">
              Web developer, coffee enthusiast, and occasional photographer.
              Building the future, one line of code at a time.
            </p>
            <div className="flex flex-wrap gap-y-2 mt-2 text-gray-500 dark:text-gray-400">
              <div className="flex items-center mr-4">
                <MapPinIcon className="w-4 h-4 mr-1" />
                San Francisco, CA
              </div>
              <div className="flex items-center mr-4">
                <LinkIcon className="w-4 h-4 mr-1" />
                <a href="#" className="text-blue-500 dark:text-blue-400">
                  example.com
                </a>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Joined September 2009
              </div>
            </div>
            <div className="flex mt-2">
              <p className="mr-4">
                <strong>5,230</strong>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  Following
                </span>
              </p>
              <p>
                <strong>3.1M</strong>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  Followers
                </span>
              </p>
            </div>
          </div>

          {/* Tweet Composer */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-4 p-4">
            <form onSubmit={handleTweetSubmit}>
              <Textarea
                placeholder="What's happening?"
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                className="w-full p-2 mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              />
              <Button type="submit">Tweet</Button>
            </form>
          </div>

          {/* Tabs */}
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
                {tweets.map((tweet) => (
                  <div
                    key={tweet.id}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4"
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
                        <button
                          className="flex items-center space-x-1"
                          onClick={() => handleRepost(tweet.id)}
                        >
                          <Repeat2 size={18} />
                          <span>{tweet.reposts}</span>
                        </button>
                        <button
                          className="flex items-center space-x-1"
                          onClick={() => handleLike(tweet.id)}
                        >
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
            <TabsContent value="replies">Replies content</TabsContent>
            <TabsContent value="media">Media content</TabsContent>
            <TabsContent value="likes">Likes content</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
