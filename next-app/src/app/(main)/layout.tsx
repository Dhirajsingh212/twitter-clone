import LeftNavbar from "@/components/LeftNavbar";
import RightSideBar from "@/components/RightSideBar";
import ScrollToTop from "@/components/ScrollToTop";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <LeftNavbar />
        {/* Main Content */}
        {children}
        {/* Right Sidebar */}
        <RightSideBar />
      </div>
    </div>
  );
};

export default Layout;
