import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarItems } from "@/resource";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

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
          return (
            <Link href={element.Link} key={index}>
              <DropdownMenuItem>
                {element.icon}
                <span>{element.text}</span>
              </DropdownMenuItem>
            </Link>
          );
        })}
        <div>
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
