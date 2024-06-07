// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import {
  deleteTask,
  getTaskId,
  getTaskIdPopulated,
  updateTask,
} from "@/lib/tasks";
import { validateSchema } from "@/lib/helper/route.helper";
import {
  getOrDeleteSchema,
  postSchema,
  putSchema,
} from "@/app/api/tasks/schema";

export async function GET(request: Request, context: any) {
  const { params } = await context;
  const { taskId } = params;
  validateSchema(getOrDeleteSchema, { taskId });
  try {
    const task = await getTaskIdPopulated(taskId);
    return NextResponse.json(task, { status: 200 });
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
  const { taskId } = params;
  validateSchema(getOrDeleteSchema, { taskId });
  try {
    const task = await deleteTask(taskId);
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

export async function PUT(request: Request, context: any) {
  const { params } = await context;
  const { taskId } = params;
  const data = await request.json();
  validateSchema(putSchema, data);
  const userId = request.headers.get("uid");
  try {
    const taskFound = await getTaskId(taskId);
    const task = await updateTask(taskId, {
      ...data,
      updated_by: userId,
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
