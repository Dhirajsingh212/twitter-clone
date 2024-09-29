"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const NotificationToaster = () => {
  useEffect(() => {
    setInterval(() => {
      toast.success("Notification recevied.");
    }, 10000);
  }, []);
  return <></>;
};

export default NotificationToaster;
