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

export async function fetchUserDetails(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
