import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareFollowerId(
  followers: { followerId: number }[],
  userId: number
) {
  return followers.find((follower) => follower.followerId === userId);
}

export function compareLikeId(
  likes: { tweetId: number; userId: number }[],
  userId: number
) {
  return likes.find((el) => {
    return el.userId === userId;
  });
}

export function compareBookmarksId(
  bookmarks: { tweetId: number; userId: number }[],
  userId: number
) {
  return bookmarks.find((el) => {
    return el.userId === userId;
  });
}

export function findDiff(pollingPostLength: number, allPostLength: number) {
  return Math.abs(pollingPostLength - allPostLength);
}

export async function uploadImages(images: any) {
  const files = images;
  if (files?.length > 0) {
    const data = new FormData();
    for (const file of files) {
      data.append("file", file);
    }
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || ""
    );
    const res = await fetch(`/api/upload`, {
      method: "POST",
      body: data,
    });
    const imageResponse = await res.json();
    if (imageResponse.status !== 200) {
      throw new Error(imageResponse.message);
    }
    return imageResponse;
  }
}
