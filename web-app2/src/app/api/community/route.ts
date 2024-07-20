// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { getCommunityById } from "@/lib/community";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
import { isAdminUserId } from "@/lib/helper/community.helper";
import { findUserByUserId } from "@/lib/users";
export async function GET(request: Request) {
  const userId = request.headers.get("uid") as string;
  const { communityId } = await findUserByUserId(userId);
  if (communityId === "") {
    return new Response(null, {
      status: 204,
    });
  }
  try {
    const communityFound = await getCommunityById(communityId as string);
    const isAdmin = isAdminUserId(communityFound.admin._id, userId as string);
    const participantsWithoutUserId = communityFound[
      "_doc"
    ].participants.filter(
      (participant) => participant.user._id.toString() !== userId
    );
    console.log(participantsWithoutUserId[0]["user"]);
    return NextResponse.json(
      {
        ...communityFound["_doc"],
        participants: participantsWithoutUserId,
        isAdmin,
      },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
