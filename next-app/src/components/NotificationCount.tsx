import { fetchNotificationCount } from "@/actions";

const NotificationCount = async ({ id }: { id: number }) => {
  const notificationCount = await fetchNotificationCount(id);

  return (
    <>{notificationCount && notificationCount > 0 ? notificationCount : null}</>
  );
};

export default NotificationCount;
