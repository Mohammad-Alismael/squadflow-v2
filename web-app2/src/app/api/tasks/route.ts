// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { createTask } from "@/lib/tasks";
import { validateSchema } from "@/lib/helper/route.helper";
import { postSchema } from "@/app/api/tasks/schema";
import { getWorkspaceById } from "@/lib/workspace";
import { revalidateTag } from "next/cache";
import { restructureComments } from "@/app/api/tasks/[taskId]/helper";
import { HttpStatusCode } from "@/utils/HttpStatusCode";

export async function POST(request: Request) {
  const data = await request.json();
  validateSchema(postSchema, data);
  const userId = request.headers.get("uid");
  if (!userId)
    return NextResponse.json(
      {
        message: "server error",
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  try {
    // for reseting user id for created_by
    data.comments = restructureComments(data.comments, userId);
    await getWorkspaceById(data.workspace);
    const task = await createTask({
      ...data,
      created_by: userId,
    });
    revalidateTag(`column-${data.columnId}`);
    return NextResponse.json({ taskId: task._id }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
