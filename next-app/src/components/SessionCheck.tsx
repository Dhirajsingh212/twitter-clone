"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Spinner from "./Spinner";

const SessionCheck = ({ children }: { children: ReactNode }) => {
  const session = useSession();

  if (session.status === "loading") {
    return <Spinner />;
  }
  if (session.status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
};

export default SessionCheck;
