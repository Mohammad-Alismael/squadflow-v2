import { NextRequest, NextResponse } from "next/server";
import { getCommunityById, handleCommunityCreation } from "@/lib/community";

export async function POST(request: Request) {
  const { name } = await request.json();
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (communityId !== "")
    return NextResponse.json({
      message:
        "you must leave your current community in order to create new one",
    });
  const newCommunityId = await handleCommunityCreation(userId as string, name);
  if (!newCommunityId)
    return NextResponse.json({
      message: "already found created a communities",
    });
  else
    return NextResponse.json({ communityId: newCommunityId }, { status: 201 });
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
