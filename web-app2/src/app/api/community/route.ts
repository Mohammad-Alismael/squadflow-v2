// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { getCommunityById } from "@/lib/community";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
export async function GET(request: Request) {
  const communityId = request.headers.get("cid");
  if (communityId === "") {
    return NextResponse.json(
      { message: "you aren't enroll to any community" },
      { status: HttpStatusCode.OK }
    );
  }
  try {
    const communityFound = await getCommunityById(communityId as string);
    return NextResponse.json(communityFound, { status: HttpStatusCode.OK });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
