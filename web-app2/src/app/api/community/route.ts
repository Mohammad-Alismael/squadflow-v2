// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { getCommunityById } from "@/lib/community";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
import { isAdminUserId } from "@/lib/helper/community.helper";
import { ObjectId } from "mongodb";
export async function GET(request: Request) {
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (communityId === "") {
    return new Response(null, {
      status: 204,
    });
  }
  try {
    const communityFound = await getCommunityById(communityId as string);
    const isAdmin = isAdminUserId(communityFound.admin._id, userId as string);
    return NextResponse.json(
      { ...communityFound["_doc"], isAdmin },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
