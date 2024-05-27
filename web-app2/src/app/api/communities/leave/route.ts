import {
  deleteCommunityByCode,
  findCommunityByCode,
  leaveCommunityForParticipants,
  replaceAdminByTheOldestMember,
} from "@/lib/community";
import { NextResponse } from "next/server";
import { updateUserCommunityId, updateUserToken } from "@/lib/users";
import {
  isAdminUserId,
  isNoOneInParticipants,
} from "@/lib/helper/community.helper";
import { deleteWorkspacesByCommunityId } from "@/lib/workspace";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = request.headers.get("uid");
  try {
    const foundCommunity = await findCommunityByCode(code as string);
    const { _id, participants } = foundCommunity;

    const isAdminUserId_ = isAdminUserId(
      foundCommunity.admin,
      userId as string
    );

    if (isAdminUserId_ && isNoOneInParticipants(participants)) {
      await deleteCommunityByCode(code as string);
      await deleteWorkspacesByCommunityId(_id);
      const user = await updateUserCommunityId(userId as string, ""); // reseting community id to empty string
      await updateUserToken(user);
      return NextResponse.json({
        message: "deleted your community, because no one joined your community",
      });
    }

    if (isAdminUserId_) await replaceAdminByTheOldestMember(_id, participants);
    else
      await leaveCommunityForParticipants(_id, userId as string, participants);

    const user = await updateUserCommunityId(userId as string, ""); // reseting community id to empty string
    await updateUserToken(user);
    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.statusCode });
  }
}
