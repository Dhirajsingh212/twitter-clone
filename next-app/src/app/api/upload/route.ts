import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const images = Array.from(formData.getAll("file")) as File[]; // Retrieve all files with the name 'file'
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

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: NextRequest) {
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
