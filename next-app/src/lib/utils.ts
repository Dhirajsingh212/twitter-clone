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
