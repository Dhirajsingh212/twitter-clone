import { fetchUserDetails } from "@/actions";
import SessionCheck from "@/components/SessionCheck";
import SettingForm from "@/components/SettingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/feed");
  }
  const userDetails = await fetchUserDetails((session.user as any).email);
  return (
    <SessionCheck>
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
