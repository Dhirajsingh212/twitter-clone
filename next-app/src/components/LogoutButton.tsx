"use client";

import { LogInIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      {session && session.status === "unauthenticated" && (
        <Button
          onClick={() => {
            router.push("/signin");
          }}
          className="flex flex-row items-center text-start p-0 bg-inherit dark:text-white shadow-none hover:bg-inherit text-black text-sm lg:text-xl lg:hover:bg-inherit lg:hover:text-blue-500 lg:dark:hover:text-blue-500"
        >
          <LogInIcon className="size-4 ml-2 mr-2 lg:ml-0 lg:size-4 lg:mr-6" />
          Login
        </Button>
      )}
      {session && session.status === "authenticated" && (
        <Button
          onClick={() => {
            signOut();
          }}
          className="flex flex-row items-center text-start p-0 bg-inherit dark:text-white shadow-none hover:bg-inherit text-black text-sm lg:text-xl lg:hover:bg-inherit lg:hover:text-blue-500 lg:dark:hover:text-blue-500"
        >
          <LogOutIcon className="size-4 ml-2 mr-2 lg:ml-0 lg:size-4 lg:mr-6" />
          Logout
        </Button>
      )}
    </>
  );
};

export default LogoutButton;
