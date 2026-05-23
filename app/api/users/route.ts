import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MOCK_USERS } from "@/lib/mockData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const city = searchParams.get("city") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    let filtered = MOCK_USERS;
    if (query) filtered = filtered.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
    if (city) filtered = filtered.filter((u) => u.city === city);
    if (category) filtered = filtered.filter((u) => [...u.skillsTeach].some((s) => s.category === category));

    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({ success: true, data, total, page, limit, hasMore: page * limit < total });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}
