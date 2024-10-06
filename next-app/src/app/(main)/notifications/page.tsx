import { fetchNotificationByEmail } from "@/actions";
import SessionCheck from "@/components/SessionCheck";
import BlurFade from "@/components/ui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthOptions } from "@/lib/auth";
import { formatDateToHrsAgo } from "@/lib/date";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Heart, UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";

const NotificationIcon = ({ type }: { type: string }) => {
  if (type.includes("liked")) {
    return <Heart className="h-4 w-4 text-red-500 fill-red-500" />;
  } else if (type.includes("commented")) {
    return <ChatBubbleIcon className="h-4 w-4 text-blue-500 fill-blue-500" />;
  } else if (type.includes("followed")) {
    return <UserIcon className="h-4 w-4 text-green-500 fill-green-500" />;
  }
};

async function fetchSession() {
  const session = await getServerSession(AuthOptions);
  if (session?.user) {
    return session.user.email;
  }
  return null;
}

const Notifications = async () => {
  const email = await fetchSession();

  const allNotifications = await fetchNotificationByEmail(email || "");

  return (
    <SessionCheck>
      <div className="py-2 rounded-lg sm:px-4">
        <Card className="w-full max-w-3xl mx-auto py-4">
          <CardContent>
            <ScrollArea className="h-[76vh]">
              {allNotifications.length === 0 && (
                <p className="text-center">No notifications found.</p>
              )}
              <BlurFade>
                {allNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-4 mb-4 py-4 sm:p-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <NotificationIcon type={notification.message} />
                        <p className="ml-2 text-sm font-medium">
                          {notification.message}
                        </p>
                      </div>
                      <p className="text-xs ml-6 text-muted-foreground">
                        {formatDateToHrsAgo(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </BlurFade>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </SessionCheck>
  );
};

export default Notifications;
