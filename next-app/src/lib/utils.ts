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

export function findDiff(pollingPostLength: number, allPostLength: number) {
  return Math.abs(pollingPostLength - allPostLength);
}
