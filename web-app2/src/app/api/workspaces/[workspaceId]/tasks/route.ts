// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import {
  deleteWorkspaceById,
  getWorkspaceById,
  updateWorkspaceLabelsList,
} from "@/lib/workspace";
import { validateCommunity, validateSchema } from "@/lib/helper/route.helper";
import {
  deleteSchema,
  getSchema,
  patchSchema,
} from "@/app/api/workspaces/[workspaceId]/labels/schema";
import {
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
} from "@/lib/tasks";
import { ObjectId } from "mongodb";

export async function GET(request: Request, context: any) {
  const url = new URL(request.url);
  const columnId = url.searchParams.get("columnId") as string;

  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(getSchema, { workspaceId });
  try {
    await getWorkspaceById(workspaceId);
    const result = columnId
      ? await getTasksByWorkspaceIdAndColumnId(
          workspaceId,
          new ObjectId(columnId)
        )
      : await getTasksByWorkspaceId(workspaceId);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
