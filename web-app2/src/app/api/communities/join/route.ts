import { joinCommunityByCode } from "@/lib/community";
import { NextResponse } from "next/server";
import { updateUserCommunityId, updateUserToken } from "@/lib/users";
import { validateSchema } from "@/lib/helper/route.helper";
import { joinPostSchema } from "@/app/api/communities/schema";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  validateSchema(joinPostSchema, { code });
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");

  if (communityId !== "")
    return NextResponse.json({
      message:
        "you must leave your current community in order to join this community",
    });
  try {
    const communityId = await joinCommunityByCode(
      userId as string,
      code as string
    );
    const user = await updateUserCommunityId(userId as string, communityId);
    await updateUserToken(user);
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
