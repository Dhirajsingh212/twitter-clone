import { fetchPosts } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allPosts = await fetchPosts();

    return NextResponse.json(
      {
        allPosts,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
