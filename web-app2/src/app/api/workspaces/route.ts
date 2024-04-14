// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createWorkspace } from "@/lib/workspace";

export async function GET(request: Request) {
  const { name } = await request.json();

  return NextResponse.json({ message: "Hello World map" }, { status: 200 });
}

export async function POST(request: Request) {
  const { title, participants } = await request.json();
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (communityId !== "")
    return NextResponse.json({
      message: "you must join a community first!",
    });

  const workspace = await createWorkspace({
    community: communityId,
    title,
    participants,
    created_by: userId,
  });
  return NextResponse.json({ workspaceId: workspace._id });
}
