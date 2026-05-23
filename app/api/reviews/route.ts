import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MOCK_REVIEWS } from "@/lib/mockData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    let reviews = MOCK_REVIEWS;
    if (userId) reviews = reviews.filter((r) => r.reviewee._id === userId || r.reviewer._id === userId);
    return NextResponse.json({ success: true, data: reviews });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const { rating, comment, skillTaught } = await req.json();
    return NextResponse.json({ success: true, data: { _id: `rev_${Date.now()}`, rating, comment, skillTaught, createdAt: new Date() } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
