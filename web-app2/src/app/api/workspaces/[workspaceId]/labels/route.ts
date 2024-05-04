// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import {
  deleteLabelFromWorkspace,
  getWorkspaceById,
  updateWorkspaceLabelsList,
} from "@/lib/workspace";
import { validateCommunity, validateSchema } from "@/lib/helper/route.helper";
import {
  getSchema,
  patchSchema,
} from "@/app/api/workspaces/[workspaceId]/labels/schema";

export async function GET(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(getSchema, { workspaceId });
  try {
    const workspace = await getWorkspaceById(workspaceId);
    return NextResponse.json(workspace.labels, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(getSchema, { workspaceId });
  const data = await request.json();
  validateSchema(patchSchema, data);
  const communityId = request.headers.get("cid") as string;
  validateCommunity(communityId as string);
  try {
    await getWorkspaceById(workspaceId);
    await updateWorkspaceLabelsList(workspaceId, {
      color: data.color,
      title: data.title,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(getSchema, { workspaceId });
  const data = await request.json();
  if (!data.labelId || data.labelId === "")
    return NextResponse.json(
      { message: "label id is required" },
      {
        status: 400,
      }
    );
  const communityId = request.headers.get("cid") as string;
  validateCommunity(communityId as string);
  try {
    await deleteLabelFromWorkspace(workspaceId, data.labelId);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
