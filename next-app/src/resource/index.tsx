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
    Link: "/feed",
  },
  {
    text: "Explore",
    icon: <Search className="mr-2 h-4 w-4" />,
    Link: "/explore",
  },
  {
    text: "Notifications",
    icon: <Bell className="mr-2 h-4 w-4" />,
    Link: "/notifications",
  },
  {
    text: "Messages",
    icon: <Mail className="mr-2 h-4 w-4" />,
    Link: "/messages",
  },
  {
    text: "Bookmarks",
    icon: <Bookmark className="mr-2 h-4 w-4" />,
    Link: "/bookmarks",
  },
  {
    text: "Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    Link: "/profile",
  },
  {
    text: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    Link: "/settings",
  },
];

export const profileDefualtImage1 =
  "data:image/jpeg;base64,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";
export const profileDefualtImage2 =
  "data:image/jpeg;base64,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";
