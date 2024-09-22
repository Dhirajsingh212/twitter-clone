"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Spinner from "./Spinner";

const SessionCheck = ({
  children,
  Fallback,
}: {
  children: ReactNode;
  Fallback?: ReactNode;
}) => {
  const session = useSession();

  if (session.status === "loading") {
    return <>{Fallback ? Fallback : <Spinner />}</>;
  }
  if (session.status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
};

export default SessionCheck;
