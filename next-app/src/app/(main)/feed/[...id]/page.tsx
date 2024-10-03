import { fetchSinglePostById } from "@/actions";
import BookmarkButton from "@/components/BookmarkButton";
import CommentDialog from "@/components/CommentDialog";
import CustomImage from "@/components/CustomImage";
import DeleteButton from "@/components/DeleteButton";
import LikeButton from "@/components/LikeButton";
import SessionCheck from "@/components/SessionCheck";
import ShareButton from "@/components/ShareButton";
import SummaryButton from "@/components/SummaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateToHrsAgo } from "@/lib/date";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { id: string[] };
}) {
  const singlePost = await fetchSinglePostById(Number(params.id[0]));

  if (!singlePost) {
    redirect("/feed");
  }

  return (
    <div className="container max-w-2xl mx-auto p-2 sm:p-4 h-[90vh] overflow-y-scroll no-scrollbar">
      <Card className="mb-8">
        <div className="flex flex-row gap-2 items-center justify-end pr-2 pt-2">
          {singlePost && (
            <DeleteButton id={singlePost?.user.id} postId={singlePost.id} />
          )}
          <SessionCheck Fallback={<Skeleton className="w-20 h-10" />}>
            {singlePost && (
              <SummaryButton
                content={singlePost.content}
                summary={singlePost.summary || ""}
                postId={singlePost.id}
              />
            )}
          </SessionCheck>
        </div>
        <CardHeader className="flex flex-row items-center gap-4">
          <Link href={`/profile/${singlePost?.user.id}`}>
            <Avatar>
              <AvatarImage
                src={singlePost.user.profilePic}
                alt={(singlePost && singlePost.user.username) || ""}
                className="object-cover"
              />
              <AvatarFallback>
                {singlePost && singlePost.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <p className="font-semibold">
              {singlePost && singlePost.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {singlePost && formatDateToHrsAgo(singlePost.createdAt)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4 flex-wrap break-words">
            {singlePost && singlePost.content}
          </p>
        </CardContent>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {singlePost &&
            singlePost.media.map((element, index) => {
              return (
                <CustomImage
                  key={index}
                  src={element.url}
                  customStyle="h-full w-full rounded-lg object-cover"
                />
              );
            })}
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          {singlePost && (
            <LikeButton
              postId={singlePost?.id}
              likeCount={singlePost?._count.likes}
              allLikes={singlePost.likes}
            />
          )}
          {singlePost && (
            <CommentDialog
              postId={singlePost.id}
              commentCount={singlePost._count.comments}
            />
          )}
          <SessionCheck Fallback={<Skeleton className="w-full h-10" />}>
            {singlePost && (
              <BookmarkButton
                postId={singlePost.id}
                allBookmarks={singlePost.bookmarks}
              />
            )}
          </SessionCheck>
          <ShareButton id={""} />
        </CardFooter>
      </Card>

      <p className="text-xl pb-2">Comments</p>

      <div className="space-y-4">
        {singlePost && singlePost.comments.length === 0 && (
          <p className="text-center">No comments found.</p>
        )}
        {singlePost &&
          singlePost.comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={comment.user.profilePic}
                    alt=""
                  />
                  <AvatarFallback>
                    {comment.user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateToHrsAgo(comment.createdAt)}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
