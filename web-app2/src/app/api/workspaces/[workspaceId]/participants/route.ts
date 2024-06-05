// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { validateSchema } from "@/lib/helper/route.helper";
import { getSchema } from "@/app/api/workspaces/[workspaceId]/labels/schema";
import { getWorkspaceById, getWorkspaceParticipants } from "@/lib/workspace";
import { ObjectId } from "mongodb";
import { PopulatedUser } from "@/utils/@types/user";
export async function GET(request: Request, context: any) {
  const url = new URL(request.url);
  const includeDetails = url.searchParams.get("details") === "true";
  const { params } = await context;
  const { workspaceId } = params;
  const userId = request.headers.get("uid") as string;
  validateSchema(getSchema, { workspaceId });
  try {
    if (includeDetails) {
      const result = await getWorkspaceParticipants(workspaceId);
      const listWithoutUserId = result.participants.filter(
        (item: { _id: string; user: PopulatedUser; role: string }) => {
          return item.user._id !== userId;
        }
      );
      return NextResponse.json(listWithoutUserId, { status: 200 });
    }
    const res = await getWorkspaceById(workspaceId);
    const listWithoutUserId = res.participants.filter(
      (item: { _id: string; user: string; role: string }) => {
        return item.user !== userId;
      }
    );
    return NextResponse.json(listWithoutUserId, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: e.statusCode }
    );
  }
}
