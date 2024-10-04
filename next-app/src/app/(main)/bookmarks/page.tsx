import { fetchUserBookmark } from "@/actions";
import BookmarkCard from "@/components/BookmarkCard";
import BlurFade from "@/components/ui/blur-fade";
import { AuthOptions } from "@/lib/auth";
import { Bookmark } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Bookmarks = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    redirect("/feed");
  }

  const bookmarkData = await fetchUserBookmark((session as any).user.email);

  return (
    <div className="overflow-y-scroll h-[90vh] no-scrollbar w-full">
      {bookmarkData && bookmarkData.length === 0 && (
        <p className="py-4 text-xl text-center">No bookmarks.</p>
      )}
      <BlurFade>
        {bookmarkData &&
          bookmarkData.map((element: { tweet: Bookmark }) => {
            return (
              <BookmarkCard
                key={element.tweet.id}
                content={element.tweet.content}
                id={element.tweet.id}
                createdAt={element.tweet.createdAt}
                updatedAt={element.tweet.updatedAt}
                user={element.tweet.user}
                media={element.tweet.media}
              />
            );
          })}
      </BlurFade>
    </div>
  );
};

export default Bookmarks;
