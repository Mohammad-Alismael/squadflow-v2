import { NextRequest, NextResponse } from "next/server";
import {
  createCommunity,
  findCommunityByAdmin,
  getCommunityById,
} from "@/lib/community";
import Community from "@/models/community";

export async function POST(request: Request) {
  const userId = request.headers.get("uid");
  const communityFound = await findCommunityByAdmin(userId as string);
  if (!communityFound) {
    const community = await createCommunity(userId as string);
    return NextResponse.json({ communityId: community._id });
  } else
    return NextResponse.json({ message: "already found created a community" });
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
