import { z } from "zod";
import { NextResponse } from "next/server";
import { createWorkspace } from "@/lib/workspace";
import { validateCommunity, validateSchema } from "@/lib/helper/route.helper";
import { checkUserIdsExist } from "@/lib/users";
import { postSchema } from "@/app/api/workspaces/schema";

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
  const userIdsToCheck: string[] = participants.map(({ user }) => user);
  const allExist = await checkUserIdsExist(userIdsToCheck);
  if (!allExist)
    return NextResponse.json(
      { message: "some user participant id(s) aren't valid" },
      { status: 400 }
    );

  const workspace = await createWorkspace({
    community: communityId,
    title,
    participants,
    created_by: userId,
  });
  return NextResponse.json({ workspaceId: workspace._id }, { status: 201 });
}
