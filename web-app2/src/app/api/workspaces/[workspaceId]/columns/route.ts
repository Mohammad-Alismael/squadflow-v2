// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { validateSchema } from "@/lib/helper/route.helper";
import { getSchema } from "@/app/api/workspaces/[workspaceId]/labels/schema";
import { getWorkspaceById } from "@/lib/workspace";
export async function GET(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(getSchema, { workspaceId });
  try {
    const workspace = await getWorkspaceById(workspaceId);
    return NextResponse.json(workspace.columns, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
