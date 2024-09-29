"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarItems } from "@/resource";
import { Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import SessionCheck from "./SessionCheck";
import { Skeleton } from "./ui/skeleton";

export function NavbarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="lg:hidden w-56">
        {NavbarItems.map((element, index) => {
          if (
            element.text === "Profile" ||
            element.text === "Bookmarks" ||
            element.text === "Notifications" ||
            element.text === "Settings"
          ) {
            return (
              <SessionCheck
                key={index}
                Fallback={<Skeleton className="w-full min-h-10 rounded-sm" />}
              >
                <Link href={element.Link}>
                  <DropdownMenuItem>
                    {element.icon}
                    <span>{element.text}</span>
                  </DropdownMenuItem>
                </Link>
              </SessionCheck>
            );
          } else {
            return (
              <Link href={element.Link} key={index}>
                <DropdownMenuItem>
                  {element.icon}
                  <span>{element.text}</span>
                </DropdownMenuItem>
              </Link>
            );
          }
        })}
        <div>
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
