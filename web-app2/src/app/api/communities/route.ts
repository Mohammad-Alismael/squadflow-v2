import { NextRequest, NextResponse } from "next/server";
import {
  createCommunity,
  findCommunityByAdmin,
  getCommunityById,
} from "@/lib/community";
import Community from "@/models/community";
import { updateUserCommunityId, updateUserToken } from "@/lib/users";

export async function POST(request: Request) {
  const { name } = await request.json();

  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (communityId !== "")
    return NextResponse.json({
      message:
        "you must leave your current community in order to create new one",
    });
  const communityFound = await findCommunityByAdmin(userId as string);
  if (!communityFound) {
    const community = await createCommunity(userId as string, name as string);
    const user = await updateUserCommunityId(userId as string, community._id);
    await updateUserToken(user);
    return NextResponse.json({ communityId: community._id }, { status: 201 });
  } else
    return NextResponse.json({
      message: "already found created a communities",
    });
}

export async function GET(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const communityFound = await getCommunityById(id as string);
    return NextResponse.json(communityFound);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  try {
    const communityFound = await getCommunityById(id as string);
    return NextResponse.json(communityFound);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
