import { z } from "zod";
import { NextResponse } from "next/server";
import {
  createWorkspace,
  getWorkspacesByCommunityAndUser,
  getWorkspacesByCommunityId,
  getWorkspacesByCommunityIdPopulated,
} from "@/lib/workspace";
import { validateCommunity, validateSchema } from "@/lib/helper/route.helper";
import { checkUserIdsExist, findUserByUserId } from "@/lib/users";
import { postSchema } from "@/app/api/workspaces/schema";
import { IWorkspace } from "@/utils/@types/workspace";

export async function POST(request: Request) {
  const data: IWorkspace = await request.json();
  validateSchema(postSchema, data);
  const { title, participants } = data;
  if (!participants)
    return NextResponse.json(
      { message: "participants should not be empty" },
      {
        status: 400,
      }
    );
  const userId = request.headers.get("uid") as string;
  const communityId = request.headers.get("cid") as string;
  validateCommunity(communityId);
  const userIdsToCheck: string[] = data.participants.map(({ user }) => user);
  const allExist = await checkUserIdsExist(userIdsToCheck);
  if (!allExist)
    return NextResponse.json(
      { message: "some user participant id(s) aren't valid" },
      { status: 400 }
    );

  const workspace = await createWorkspace({
    community: communityId,
    title,
    participants: [...participants, { user: userId, role: "admin" }],
    created_by: userId,
  });
  return NextResponse.json({ workspaceId: workspace._id }, { status: 201 });
}

export async function GET(request: Request, context: any) {
  const userId = request.headers.get("uid") as string;
  const url = new URL(request.url);
  const participated = url.searchParams.get("participated") == "true";
  const { communityId } = await findUserByUserId(userId);
  validateCommunity(communityId);
  try {
    if (participated) {
      const workspaces = await getWorkspacesByCommunityAndUser(
        communityId,
        userId
      );
      return NextResponse.json(workspaces, { status: 200 });
    }
    const workspaces = await getWorkspacesByCommunityIdPopulated(communityId);
    return NextResponse.json(workspaces, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
