import { fetchUserDetails } from "@/actions";
import SessionCheck from "@/components/SessionCheck";
import SettingForm from "@/components/SettingForm";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function fetchSession() {
  const session = await getServerSession(AuthOptions);
  if (session?.user) {
    return session.user.email;
  }
  return null;
}

const Settings = async () => {
  const email = await fetchSession();
  const userDetails = await fetchUserDetails(email || "");
  return (
    <SessionCheck
      Fallback={
        <div className="w-full flex flex-col gap-4 md:px-10">
          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-10 sm:w-60 w-1/2 mt-4 self-end" />
        </div>
      }
    >
      {userDetails && (
        <SettingForm
          emailProp={userDetails.email}
          usernameProp={userDetails.username}
        />
      )}
    </SessionCheck>
  );
};

export default Settings;
