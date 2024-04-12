import { leaveCommunityByCode } from "@/lib/community";
import { NextResponse } from "next/server";
import { updateUserCommunityId, updateUserToken } from "@/lib/users";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = request.headers.get("uid");
  try {
    await leaveCommunityByCode(userId as string, code as string);
    const user = await updateUserCommunityId(userId, ""); // reseting community id to empty string
    await updateUserToken(user);
    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: e.message });
  }
}
