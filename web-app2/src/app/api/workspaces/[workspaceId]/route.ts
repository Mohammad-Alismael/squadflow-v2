// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import {
  createWorkspace,
  deleteWorkspaceById,
  getWorkspaceById,
  updateWorkspace,
} from "@/lib/workspace";
import { z } from "zod";
import {
  isUserIdHasRole,
  isUserWhoCreatedWorkspace,
} from "@/lib/workspace.helper";
const getSchema = z.object({
  workspaceId: z.string().refine((val) => typeof val === "string", {
    message: "workspaceId should be a string",
  }),
});
export async function GET(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  const validation = getSchema.safeParse({ workspaceId });
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
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

const putSchema = z.object({
  workspaceId: z.string().refine((val) => true, {
    message: "workspaceId should be a string",
  }),
  title: z.string("title should be a string"),
  participants: z.array(
    z
      .object({
        user: z.string(),
        role: z.enum(["admin", "editor", "viewer"]),
      })
      .refine((value) => ["admin", "editor", "viewer"].includes(value.role), {
        message: "role should be either admin or editor or viewer",
      })
  ),
});
export async function PUT(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  const { title, participants } = await request.json();
  putSchema.safeParse({ workspaceId, title, participants });
  const validation = putSchema.safeParse({ workspaceId, title, participants });
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (!communityId || communityId === "")
    return NextResponse.json({
      message: "you must join a community first!",
    });
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

const deleteSchema = z.object({
  workspaceId: z.string().refine((val) => typeof val === "string", {
    message: "workspaceId should be a string",
  }),
});
export async function DELETE(request: Request, context) {
  const { params } = await context;
  const { workspaceId } = params;
  const validation = deleteSchema.safeParse({ workspaceId });
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
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
  return NextResponse.json({ message: "success!" }, { status: 200 });
}
