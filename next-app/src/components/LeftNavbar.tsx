"use client";
import { cn } from "@/lib/utils";
import { NavbarItems } from "@/resource";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { NavbarMenu } from "./NavbarMenu";
import SessionCheck from "./SessionCheck";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const LeftNavbar = () => {
  const pathName = usePathname();
  return (
    <aside className="lg:w-1/4 lg:pr-4 mb-4 lg:mb-0">
      <nav className="flex lg:flex-col justify-between lg:justify-start lg:space-y-4">
        <div className="text-2xl font-bold flex flex-row justify-between lg:pl-8">
          <Link href="/feed">{process.env.NEXT_TWITTER_ICON || "X"}</Link>
          <div className="hidden lg:block">
            <ThemeToggleButton />
          </div>
        </div>
        <div className="hidden lg:block space-y-4">
          {NavbarItems.map((element, index) => {
            const isTrue = pathName === element.Link ? true : false;
            if (
              element.text === "Profile" ||
              element.text === "Messages" ||
              element.text === "Bookmarks" ||
              element.text === "Settings"
            ) {
              return (
                <SessionCheck
                  key={index}
                  Fallback={<Skeleton className="w-full min-h-10 rounded-sm" />}
                >
                  <Link
                    className={cn(
                      "hover:text-blue-500  transition duration-200 w-full justify-start items-center flex flex-row gap-4 text-xl  rounded-full",
                      {
                        "text-blue-500": isTrue,
                      }
                    )}
                    href={element.Link || "/feed"}
                  >
                    {element.icon}
                    {element.text}
                  </Link>
                </SessionCheck>
              );
            } else {
              return (
                <Link
                  key={index}
                  className={cn(
                    "hover:text-blue-500  transition duration-200 w-full justify-start items-center flex flex-row gap-4 text-xl  rounded-full",
                    {
                      "text-blue-500": isTrue,
                    }
                  )}
                  href={element.Link || "/feed"}
                >
                  {element.icon}
                  {element.text}
                </Link>
              );
            }
          })}

          <LogoutButton />

          <Link href="/feed">
            <Button
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold"
              size="lg"
            >
              Post
            </Button>
          </Link>
        </div>

        <div className="flex flex-row gap-2 items-center lg:hidden">
          <ThemeToggleButton />
          <NavbarMenu />
        </div>
      </nav>
    </aside>
  );
};

export default LeftNavbar;
