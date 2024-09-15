import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  Settings,
  User,
} from "lucide-react";

export const NavbarItems = [
  {
    text: "Home",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    text: "Explore",
    icon: <Search className="mr-2 h-4 w-4" />,
  },
  {
    text: "Notifications",
    icon: <Bell className="mr-2 h-4 w-4" />,
  },
  {
    text: "Messages",
    icon: <Mail className="mr-2 h-4 w-4" />,
  },
  {
    text: "Bookmarks",
    icon: <Bookmark className="mr-2 h-4 w-4" />,
  },
  {
    text: "Profile",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    text: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];
