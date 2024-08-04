import { NextResponse } from "next/server";
import { handleCommunityExit } from "@/lib/community";
export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code)
    return NextResponse.json({ message: "code not found!" }, { status: 400 });

  const userId = request.headers.get("uid") as string;
  try {
    const message = await handleCommunityExit(userId, code);
    return NextResponse.json(message);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.statusCode });
  }
}
