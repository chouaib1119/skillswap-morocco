import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MOCK_EXCHANGES } from "@/lib/mockData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    let exchanges = MOCK_EXCHANGES;

    if (status) {
      exchanges = exchanges.filter((e) => e.status === status);
    }

    if (userId) {
      exchanges = exchanges.filter((e) =>
        e.requester._id === userId || e.receiver._id === userId
      );
    }

    return NextResponse.json({ success: true, data: exchanges });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch exchanges" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: true, message: "Exchange request sent" }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create exchange" }, { status: 500 });
  }
}
