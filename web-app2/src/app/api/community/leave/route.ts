import { leaveCommunityByCode } from "@/lib/community";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = request.headers.get("uid");
  try {
    await leaveCommunityByCode(userId as string, code as string);
    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: e.message });
  }
}
