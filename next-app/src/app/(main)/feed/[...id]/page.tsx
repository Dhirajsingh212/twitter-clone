import { fetchSinglePostById } from "@/actions";
import CommentDialog from "@/components/CommentDialog";
import LikeButton from "@/components/LikeButton";
import SessionCheck from "@/components/SessionCheck";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDateToHrsAgo } from "@/lib/date";
import { RepeatIcon, ShareIcon } from "lucide-react";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: { id: string[] };
}) {
  const singlePost = await fetchSinglePostById(Number(params.id[0]));

  return (
    <div className="container max-w-2xl mx-auto p-4 h-[90vh] overflow-y-scroll no-scrollbar">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Link href={`/profile/${singlePost?.user.id}`}>
            <Avatar>
              <AvatarImage
                src=""
                alt={(singlePost && singlePost.user.username) || ""}
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
          <p className="text-xl mb-4">{singlePost && singlePost.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SessionCheck>
            {singlePost && (
              <LikeButton
                postId={singlePost?.id}
                likeCount={singlePost?._count.likes}
              />
            )}
            {singlePost && (
              <CommentDialog
                postId={singlePost.id}
                commentCount={singlePost._count.comments}
              />
            )}
            <Button variant="ghost" size="sm">
              <RepeatIcon className="w-4 h-4 mr-2" />
              20
            </Button>
            <Button variant="ghost" size="sm">
              <ShareIcon className="w-4 h-4" />
            </Button>
          </SessionCheck>
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
                  <AvatarImage src="" alt="" />
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
