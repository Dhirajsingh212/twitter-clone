import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

const rateLimiter = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60,
});

export async function POST(req: NextRequest) {
  try {
    const ipAddress =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for") ||
      "127.0.0.1";

    const currentRequestCount = rateLimiter.get(ipAddress) || 0;

    if (currentRequestCount >= 10) {
      return NextResponse.json(
        { error: "Too many requests, please try again later." },
        { status: 429 }
      );
    }

    rateLimiter.set(ipAddress, currentRequestCount + 1);

    const { text } = await req.json();

    const response = await fetch(process.env.SUMMARY_URL || "", {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_SECRET}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: text }),
    });

    const data = await response.json();

    return NextResponse.json(
      { summary_text: data[0].summary_text },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
