"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [text, setText] = useState<string>("");
  const [query] = useDebounce(text, 500);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push("/feed");
    } else {
      router.push(`/feed?search=${query}`);
    }
  }, [query, router]);

  return (
    <div>
      <Search className=" absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Search"
        className="pl-8 rounded-full bg-gray-100 dark:bg-zinc-800 focus-visible:ring-0 border-gray-200 dark:border-gray-800"
      />
    </div>
  );
};

export default SearchBar;
