import { fetchUserAllPost, fetchUserDetails } from "@/actions";
import ProfileBioDialog from "@/components/ProfileBioDialog";
import ProfileTabs from "@/components/ProfileTabs";
import NextAuth from "@/lib/auth";
import { formatDateString } from "@/lib/date";
import { profileDefualtImage1, profileDefualtImage2 } from "@/resource";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function FullXProfile() {
  const session = await getServerSession(NextAuth);

  if (!session || !(session as any).user) {
    redirect("/feed");
  }

  const userDetails = await fetchUserDetails((session as any).user.email);
  const userPosts = await fetchUserAllPost((session as any).user.email);

  return (
    <div className="flex flex-col h-[90vh] no-scrollbar overflow-y-scroll lg:w-1/2">
      <div className="w-full text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex">
          <div className="flex-grow max-w-2xl lg:p-4">
            <div className="relative">
              <Image
                width={1000}
                height={1000}
                src={profileDefualtImage1}
                alt="Profile banner"
                className="w-full h-48 object-cover"
              />
              <Image
                width={1000}
                height={1000}
                src={profileDefualtImage2}
                alt="Profile picture"
                className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
              />
            </div>

            {/* Profile Info */}
            <div className="mt-16 px-4">
              <div className="flex justify-end mb-4">
                <ProfileBioDialog
                  bio={(userDetails && userDetails.bio) || ""}
                  location={(userDetails && userDetails.location) || ""}
                  link={(userDetails && userDetails.link) || ""}
                />
              </div>
              <h1 className="text-xl font-bold">
                {userDetails && userDetails.username}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {userDetails && userDetails.email}
              </p>
              <p className="mt-2 flex-wrap break-words">
                {userDetails && userDetails.bio}
              </p>
              <div className="flex flex-wrap gap-y-2 mt-2 text-gray-500 dark:text-gray-400">
                {userDetails && userDetails.location && (
                  <div className="flex items-center mr-4">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {userDetails.location}
                  </div>
                )}
                {userDetails && userDetails.link && (
                  <div className="flex items-center mr-4">
                    <LinkIcon className="w-4 h-4 mr-1" />
                    <a
                      href={`${userDetails.link}`}
                      target="_blank"
                      className="text-blue-500 dark:text-blue-400"
                    >
                      <span className="visible max-md:hidden flex-wrap break-words">
                        {userDetails.link}
                      </span>
                      <span className="visible md:hidden">Link</span>
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Joined{" "}
                  {userDetails ? formatDateString(userDetails.createdAt) : ""}
                </div>
              </div>
              <div className="flex mt-2">
                <p className="mr-4">
                  <strong>{userDetails?._count.followers}</strong>{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    Following
                  </span>
                </p>
                <p>
                  <strong>{userDetails?._count.following}</strong>{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    Followers
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <ProfileTabs posts={userPosts} />
    </div>
  );
}
