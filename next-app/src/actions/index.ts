"use server";
import prisma from "@/db/db";

export async function fetchPosts() {
  try {
    const allPosts = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return allPosts;
  } catch (err) {
    console.log(err);
    return [];
  }
}
