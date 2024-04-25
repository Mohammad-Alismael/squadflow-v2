// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import {
  createWorkspace,
  deleteWorkspaceById,
  getWorkspaceById,
  updateWorkspace,
} from "@/lib/workspace";
import {
  isUserIdHasRole,
  isUserWhoCreatedWorkspace,
} from "@/lib/helper/workspace.helper";
import { validateCommunity, validateSchema } from "@/lib/helper/route.helper";
import {
  deleteSchema,
  getSchema,
  putSchema,
} from "@/app/api/workspaces/[workspaceId]/schema";

export async function GET(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(getSchema, { workspaceId });
  try {
    const workspace = await getWorkspaceById(workspaceId);
    return NextResponse.json(workspace, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  const { title, participants } = await request.json();
  validateSchema(putSchema, { workspaceId, title, participants });
  const userId = request.headers.get("uid") as string;
  const communityId = request.headers.get("cid");
  validateCommunity(communityId as string);
  const workspace = await getWorkspaceById(workspaceId);
  if (
    !isUserWhoCreatedWorkspace(userId, workspace.created_by) &&
    !isUserIdHasRole(workspace.participants, userId, "admin")
  )
    throw new Error("you are not allowed to change workspace details");
  await updateWorkspace({
    _id: workspaceId,
    community: communityId,
    title,
    participants,
    updated_by: userId,
  });
  return NextResponse.json({ message: "success!" }, { status: 200 });
}

export async function DELETE(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(deleteSchema, { workspaceId });
  try {
    await getWorkspaceById(workspaceId);
    await deleteWorkspaceById(workspaceId);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
