import { fetchUserBookmark } from "@/actions";
import BookmarkCard from "@/components/BookmarkCard";
import { Bookmark } from "@/types";
import { getServerSession } from "next-auth";

const Bookmarks = async () => {
  const session = await getServerSession();

  const bookmarkData = await fetchUserBookmark((session as any).user.email);
  console.log(bookmarkData);
  return (
    <div className="mx-auto overflow-y-scroll h-[90vh] no-scrollbar">
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
            />
          );
        })}
    </div>
  );
};

export default Bookmarks;
