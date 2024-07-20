import { handleCommunityJoin, joinCommunityByCode } from "@/lib/community";
import { NextResponse } from "next/server";
import { updateUserCommunityId, updateUserToken } from "@/lib/users";
import { validateSchema } from "@/lib/helper/route.helper";
import { joinPostSchema } from "@/app/api/communities/schema";
import { HttpStatusCode } from "@/utils/HttpStatusCode";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnId = url.searchParams.get("returnId") === "true";
  console.log({ code, returnId });
  validateSchema(joinPostSchema, { code });
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (communityId !== "")
    return NextResponse.json(
      {
        message:
          "you must leave your current community in order to join this community",
      },
      { status: HttpStatusCode.CONFLICT }
    );
  try {
    const user = await handleCommunityJoin(userId as string, code as string);
    if (!returnId) {
      await updateUserToken(user);
      return NextResponse.json({ message: "success" });
    } else {
      return NextResponse.json({ communityId });
    }
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.statusCode });
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
