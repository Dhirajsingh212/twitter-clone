"use server";
import prisma from "@/db/db";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// ************************USERS**********************************//

export async function fetchUserDetailsById(userId: number) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        location: true,
        link: true,
        createdAt: true,
        updatedAt: true,
        profilePic: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        following: {
          select: {
            followerId: true,
          },
        },
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchUserDetails(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        profilePic: true,
        location: true,
        link: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateUsernameAndEmail(
  email: string,
  username: string,
  oldEmail: string
) {
  try {
    await prisma.user.update({
      where: {
        email: oldEmail,
      },
      data: {
        username,
        email,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
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

async function deleteImage(urls: { url: string }[]) {
  await Promise.all(
    urls.map(async (el) => {
      const res = await fetch(
        `http://localhost:3000/api/upload/?url=${el.url}`,
        {
          method: "DELETE",
        }
      );
      const deletedImageData = await res.json();
    })
  );
}

export async function deleteTweet(postId: number) {
  try {
    await prisma.$transaction(async (prisma) => {
      const mediaData = await prisma.media.findMany({
        where: {
          tweetId: postId,
        },
        select: {
          url: true,
        },
      });

      await deleteImage(mediaData);

      await prisma.media.deleteMany({
        where: {
          tweetId: postId,
        },
      });

      await prisma.bookmark.deleteMany({
        where: {
          tweetId: postId,
        },
      });

      await prisma.like.deleteMany({
        where: {
          tweetId: postId,
        },
      });

      await prisma.comment.deleteMany({
        where: {
          tweetId: postId,
        },
      });

      await prisma.tweet.deleteMany({
        where: {
          id: postId,
        },
      });
    });
    revalidatePath("/feed");
    revalidatePath(`/feed/${postId}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function postTweet(
  userId: number,
  message: string,
  mediaUrls: string[]
) {
  try {
    const tweet = await prisma.tweet.create({
      data: {
        content: message,
        userId: userId,
        media: {
          create: mediaUrls.map((url) => ({
            url: url,
          })),
        },
      },
      include: {
        media: true,
      },
    });

    revalidatePath("/feed");
    return true;
  } catch (err) {
    console.error("Error creating tweet:", err);
    return false;
  }
}

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
        media: {
          select: {
            url: true,
          },
        },
        bookmarks: {
          select: {
            userId: true,
            tweetId: true,
          },
        },
        likes: {
          select: {
            tweetId: true,
            userId: true,
          },
        },
        user: {
          select: {
            username: true,
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
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

export async function fetchUserAllPostById(userId: number) {
  try {
    const userPosts = await prisma.tweet.findMany({
      where: {
        userId,
      },
      select: {
        userId: true,
        content: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        bookmarks: {
          select: {
            tweetId: true,
            userId: true,
          },
        },
        likes: {
          select: {
            tweetId: true,
            userId: true,
          },
        },
        user: {
          select: {
            username: true,
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
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
      select: {
        userId: true,
        content: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        media: {
          select: {
            url: true,
          },
        },
        bookmarks: {
          select: {
            userId: true,
            tweetId: true,
          },
        },
        likes: {
          select: {
            tweetId: true,
            userId: true,
          },
        },
        user: {
          select: {
            username: true,
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
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

export async function fetchSinglePostById(postId: number) {
  try {
    const singlePost = await prisma.tweet.findFirst({
      where: {
        id: postId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        likes: {
          select: {
            tweetId: true,
            userId: true,
          },
        },
        media: {
          select: {
            url: true,
          },
        },
        bookmarks: {
          select: {
            tweetId: true,
            userId: true,
          },
        },
        user: {
          select: {
            username: true,
            profilePic: true,
            id: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            content: true,
            createdAt: true,
            id: true,
            user: {
              select: {
                username: true,
                profilePic: true,
              },
            },
          },
        },
      },
    });
    return singlePost;
  } catch (err) {
    console.log(err);
    return null;
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

    revalidatePath("/feed");
    revalidatePath("/profile");

    return true;
  } catch (err) {
    console.log(err);
    revalidatePath("/feed");
    revalidatePath("/profile");
    return null;
  }
}

// **************************************************************//

// ************************LIKES**********************************//

export async function isLikedByUser(userId: number, postId: number) {
  try {
    const likedByUser = await prisma.like.findFirst({
      where: {
        userId,
        tweetId: postId,
      },
    });

    if (likedByUser) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function tweetLike(userId: number, postId: number) {
  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        tweetId: postId,
      },
    });
    if (existingLike) {
      await prisma.like.deleteMany({
        where: {
          userId,
          tweetId: postId,
        },
      });
      revalidatePath("/feed");
      revalidatePath("/profile");
      return false;
    }
    await prisma.like.create({
      data: {
        userId,
        tweetId: postId,
      },
    });
    revalidatePath("/feed");
    revalidatePath("/profile");

    return true;
  } catch (err) {
    console.log(err);
    revalidatePath("/feed");
    revalidatePath("/profile");
    return false;
  }
}

// **************************************************************//

// ********************FOLLOW***********************************//

export async function followUser(followId: number, userId: number) {
  try {
    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: followId,
      },
    });
    revalidatePath(`/profile/${followId}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function unfollowUser(followId: number, userId: number) {
  try {
    await prisma.follow.deleteMany({
      where: {
        followerId: userId,
        followingId: followId,
      },
    });
    revalidatePath(`/profile/${followId}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// **************************************************************//

// ********************BOOKMARKS*********************************//

export async function deleteBookmarkById(userId: number, bookmarkId: number) {
  try {
    await prisma.bookmark.deleteMany({
      where: {
        userId: userId,
        tweetId: bookmarkId,
      },
    });
    revalidatePath("/bookmarks");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addBookmark(userId: number, postId: number) {
  try {
    await prisma.bookmark.create({
      data: {
        userId,
        tweetId: postId,
      },
    });
    revalidatePath("/feed");
    revalidatePath("/bookmarks");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function fetchUserBookmark(email: string) {
  try {
    const userDetails = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!userDetails) {
      return false;
    }
    const bookmarkData = await prisma.bookmark.findMany({
      where: {
        userId: userDetails.id,
      },
      select: {
        tweet: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            media: {
              select: {
                url: true,
              },
            },
            user: {
              select: {
                username: true,
                id: true,
                profilePic: true,
              },
            },
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
      },
    });
    return bookmarkData;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// **************************************************************//

// ***********************IMAGE UPLOAD******************************//

// const cloudinaryConfig = cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// export async function getSignature() {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const signature = cloudinary.utils.api_sign_request(
//     { timestamp, folder: "twitter_clone" },
//     cloudinaryConfig.api_secret || ""
//   );

//   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

//   return { timestamp, signature, uploadPreset };
// }

// ****************************************************************//
