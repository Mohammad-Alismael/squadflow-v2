// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { createTask, updateTask } from "@/lib/tasks";
import { validateCommunity, validateSchema } from "@/lib/helper/route.helper";
import { postSchema } from "@/app/api/tasks/schema";
import { getWorkspaceById } from "@/lib/workspace";

export async function POST(request: Request) {
  const data = await request.json();
  validateSchema(postSchema, data);
  const userId = request.headers.get("uid");
  try {
    await getWorkspaceById(data.workspace);
    const task = await createTask({
      ...data,
      created_by: userId,
    });
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
