import { NavbarItems } from "@/resource";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Button } from "./ui/button";

const LeftNavbar = () => {
  return (
    <aside className="lg:w-1/4 lg:pr-4 mb-4 lg:mb-0">
      <nav className="flex lg:flex-col justify-between lg:justify-start lg:space-y-4">
        <Link
          href="/"
          className="text-2xl font-bold flex flex-row justify-between lg:pl-8"
        >
          𝕏
          <div className="hidden lg:block">
            <ThemeToggleButton />
          </div>
        </Link>
        <div className="hidden lg:block space-y-4">
          {NavbarItems.map((element, index) => {
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start flex flex-row gap-4 text-xl  rounded-full"
                size="lg"
              >
                {element.icon}
                {element.text}
              </Button>
            );
          })}

          <Button
            className="w-full  bg-blue-600 hover:bg-blue-500 text-white font-bold"
            size="lg"
          >
            Post
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </nav>
    </aside>
  );
};

export default LeftNavbar;
