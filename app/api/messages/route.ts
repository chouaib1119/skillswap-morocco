import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    if (!conversationId) return NextResponse.json({ success: false, error: "conversationId required" }, { status: 400 });
    return NextResponse.json({ success: true, data: [] });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const { conversationId, content } = await req.json();
    if (!conversationId || !content) return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    return NextResponse.json({ success: true, data: { _id: `msg_${Date.now()}`, conversationId, content, createdAt: new Date() } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
