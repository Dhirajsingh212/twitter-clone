"use client";
import { postNotification } from "@/actions";
import { pusherClient } from "@/pusher/pusherClient";
import { BellRingIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const NotificationToaster = () => {
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      const channel = pusherClient.subscribe(`${userId}`);
      channel.bind(`${userId}`, (data: any) => {
        const postNotificationDetails = async () => {
          await postNotification(userId, data);
        };

        postNotificationDetails();

        toast(`${data}`, {
          icon: <BellRingIcon className="fill-green-500 text-green-500" />,
          style: {
            borderRadius: "10px",
            background: "#1e293b",
            color: "#fff",
          },
        });
      });

      return () => {
        pusherClient.unsubscribe(`${userId}`);
      };
    }
  }, [session.status]);

  if (session.status === "loading") {
    return null;
  }

  if (session.status === "unauthenticated") {
    return null;
  }

  const userId = Number((session.data?.user as any).id);

  return <></>;
};

export default NotificationToaster;
