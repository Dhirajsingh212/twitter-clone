import { fetchPosts } from "@/actions";
import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

const rateLimiter = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60,
});

export async function GET(req: NextRequest) {
  try {
    const ipAddress =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for") ||
      "127.0.0.1";

    const currentRequestCount = rateLimiter.get(ipAddress) || 0;

    if (currentRequestCount >= 30) {
      return NextResponse.json(
        { error: "Too many requests, please try again later." },
        { status: 429 }
      );
    }

    rateLimiter.set(ipAddress, currentRequestCount + 1);

    const allPosts = await fetchPosts();

    return NextResponse.json({ allPosts }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
