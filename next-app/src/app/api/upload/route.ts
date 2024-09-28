import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

const rateLimiter = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60,
});

const RATE_LIMIT_REQUESTS = 10;

function checkRateLimit(ipAddress: string): boolean {
  const currentRequestCount = rateLimiter.get(ipAddress) || 0;

  if (currentRequestCount >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  rateLimiter.set(ipAddress, currentRequestCount + 1);
  return true;
}

export async function POST(req: NextRequest) {
  const ipAddress =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    "127.0.0.1";

  if (!checkRateLimit(ipAddress)) {
    return NextResponse.json(
      { success: false, message: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const images = Array.from(formData.getAll("file")) as File[];
    const imagePreset = formData.get("upload_preset");

    if (images.length === 0 || !imagePreset) {
      return NextResponse.json({ success: false, message: "No images found" });
    }

    if (images.length > 4) {
      return NextResponse.json({
        success: false,
        message: "Max of 4 images allowed.",
      });
    }

    const uploadResponses = await Promise.all(
      images.map(async (img) => {
        const imageForm = new FormData();
        imageForm.append("file", img);
        imageForm.append("upload_preset", imagePreset);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: imageForm,
          }
        );

        return uploadResponse.json();
      })
    );
    return NextResponse.json({
      uploadedImagesData: uploadResponses,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const ipAddress =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    "127.0.0.1";

  if (!checkRateLimit(ipAddress)) {
    return NextResponse.json(
      { success: false, message: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  const url = req.url?.split("=")[1];

  if (typeof url !== "string") {
    return NextResponse.json({
      message: "Invalid input: url must be a string",
    });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const publicId = extractPublicId(decodedUrl);

    if (!publicId) {
      return NextResponse.json({ message: "Invalid URL format" });
    }

    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result.result === "ok") {
      return NextResponse.json({
        success: true,
        message: "Image deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Image not found or already deleted",
      });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

function extractPublicId(url: string): string | null {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  return match ? `Twitter_clone/${match[1].split("/")[1]}` : null;
}

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
