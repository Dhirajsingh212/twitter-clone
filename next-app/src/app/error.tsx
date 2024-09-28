"use client";
import { redirect } from "next/navigation";

const Error = () => {
  redirect("/feed");
};

export default Error;
