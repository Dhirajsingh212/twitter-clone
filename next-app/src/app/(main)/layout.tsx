import LeftNavbar from "@/components/LeftNavbar";
import RightSideBar from "@/components/RightSideBar";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <LeftNavbar />
        {/* Main Content */}
        {children}
        {/* Right Sidebar */}
        <Suspense
          fallback={<Skeleton className="h-96 lg:w-1/4 lg:ml-4 mt-4 lg:mt-0" />}
        >
          <RightSideBar />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
