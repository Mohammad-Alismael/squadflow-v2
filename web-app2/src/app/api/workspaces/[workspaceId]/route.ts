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
import { checkUserIdsExist } from "@/lib/users";
import { IWorkspace } from "@/utils/@types/workspace";

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
  const data: IWorkspace = await request.json();
  if (!data.participants)
    return NextResponse.json(
      { message: "participants should be defined" },
      { status: 400 }
    );
  validateSchema(putSchema, data);
  const userId = request.headers.get("uid") as string;
  const communityId = request.headers.get("cid") as string;
  validateCommunity(communityId as string);
  try {
    const workspace: IWorkspace = await getWorkspaceById(workspaceId);
    const x = isUserIdHasRole(workspace.participants, userId, "admin");
    if (!x) throw new Error("you are not allowed to change workspace details");

    const userIdsToCheck: string[] = data.participants.map(({ user }) => user);
    const allExist = await checkUserIdsExist(userIdsToCheck);
    if (!allExist)
      return NextResponse.json(
        { message: "some user participant id(s) aren't valid" },
        { status: 400 }
      );

    await updateWorkspace({
      _id: workspaceId,
      community: communityId as string,
      title: data.title,
      participants: data.participants,
      labels: data.labels,
      updated_by: userId,
    });
    return NextResponse.json({ message: "success!" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: e.statusCode }
    );
  }
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
