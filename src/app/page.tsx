"use client";

import Feed from "@/components/Feed";
import LeftNavbar from "@/components/LeftNavbar";
import RightSideBar from "@/components/RightSideBar";

export default function XHome() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <LeftNavbar />
        {/* Main Content */}
        <Feed />
        {/* Right Sidebar */}
        <RightSideBar />
      </div>
    </div>
  );
}
