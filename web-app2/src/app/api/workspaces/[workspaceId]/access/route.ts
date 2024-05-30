// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { getUserRoleInWorkspace } from "@/lib/workspace";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
export async function GET(request: Request, context: any) {
  const userId = request.headers.get("uid") as string;
  const { params } = await context;
  const { workspaceId } = params;
  try {
    const roleFound = await getUserRoleInWorkspace(workspaceId, userId);
    if (roleFound) {
      return NextResponse.json({ role: roleFound }, { status: 200 });
    }
    return new Response(null, {
      status: HttpStatusCode.NOT_FOUND,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.statusCode });
  }
}
