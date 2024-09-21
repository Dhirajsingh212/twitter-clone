"use server";
import prisma from "@/db/db";
import { revalidatePath } from "next/cache";

// ************************USERS**********************************//

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

export async function updateBio(
  id: number,
  bio: string,
  location: string,
  link: string
) {
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        bio,
        location,
        link,
      },
    });
    revalidatePath("/profile");
  } catch (err) {
    console.log(err);
  }
}

// **************************************************************//

// ************************TWEET**********************************//

export async function fetchPosts() {
  try {
    const allPosts = await prisma.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        userId: true,
        content: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return allPosts;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function fetchUserAllPost(email: string) {
  try {
    const userDetails = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const userPosts = await prisma.tweet.findMany({
      where: {
        userId: userDetails?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return userPosts || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

// **************************************************************//

// ************************COMMENTS**********************************//

export async function postComment(
  userId: number,
  postId: number,
  comment: string
) {
  try {
    await prisma.comment.create({
      data: {
        content: comment,
        tweetId: postId,
        userId: userId,
      },
    });

    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// **************************************************************//
