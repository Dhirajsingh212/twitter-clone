import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const RightSideBar = () => {
  return (
    <aside className="lg:w-1/4 lg:pl-4 mt-4 lg:mt-0">
      <div className="relative mb-4">
        <Search className=" absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Search"
          className="pl-8 rounded-full bg-gray-100 dark:bg-zinc-800 focus-visible:ring-0 border-gray-200 dark:border-gray-800"
        />
      </div>
      <Card className="bg-gray-100 dark:bg-gray-900">
        <CardHeader>
          <h2 className="text-xl font-semibold">Trends for you</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {["#TrendingTopic1", "#TrendingTopic2", "#TrendingTopic3"].map(
              (topic, index) => (
                <li
                  key={index}
                  className="pb-2 border-b border-gray-200 dark:border-gray-800"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Trending in Your Area
                  </p>
                  <p className="font-semibold">{topic}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10.5K posts
                  </p>
                </li>
              )
            )}
          </ul>
        </CardContent>
        <CardFooter className="p-6">
          <Link
            href="#"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Show more
          </Link>
        </CardFooter>
      </Card>
    </aside>
  );
};

export default RightSideBar;
