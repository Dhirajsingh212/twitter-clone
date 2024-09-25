import ChatComponent from "@/components/ChatComponent";
import LeftNavbar from "@/components/LeftNavbar";

const Page = () => {
  return (
    <div className="dark:bg-black dark:text-white h-screen w-full py-4 px-4 md:px-12 flex flex-row gap-2">
      <LeftNavbar />
      <ChatComponent />
    </div>
  );
};

export default Page;
