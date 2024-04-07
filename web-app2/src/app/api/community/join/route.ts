import {
  createCommunity,
  findCommunityByAdmin,
  findCommunityByCode,
  joinCommunityByCode,
} from "@/lib/community";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = request.headers.get("uid");
  try {
    await joinCommunityByCode(userId as string, code as string);
    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: e.message });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = request.headers.get("uid");
  try {
    await joinCommunityByCode(userId as string, code as string);
  } catch (e) {
    return NextResponse.json({ message: e.message });
  }
}
