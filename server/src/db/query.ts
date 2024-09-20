import { prisma } from "./db";

interface Post {
  id: number;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
}

export async function SaveToDB(
  id: number,
  message: string
): Promise<Post | null> {
  try {
    const newPost = await prisma.tweet.create({
      data: {
        userId: id,
        content: message,
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
    return newPost;
  } catch (err) {
    console.log(err);
    return null;
  }
}
