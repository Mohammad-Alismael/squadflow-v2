// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { validateSchema } from "@/lib/helper/route.helper";
import { getOrDeleteSchema, postCommentSchema } from "@/app/api/tasks/schema";
import { addCommentToTask, getCommentsTaskId, getTaskId } from "@/lib/tasks";
import { ObjectId } from "mongodb";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { taskId } = params;
  validateSchema(getOrDeleteSchema, { taskId });
  try {
    const res = await getCommentsTaskId(new ObjectId(taskId));
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, context: any) {
  const { params } = context;
  const { taskId } = params;
  const { text } = await request.json();
  console.log({ taskId, text });
  const userId = request.headers.get("uid") as string;
  validateSchema(getOrDeleteSchema, { taskId });
  if (!text)
    return NextResponse.json(
      { message: "text should not be empty" },
      {
        status: 400,
      }
    );
  try {
    await addCommentToTask(taskId, {
      user: userId as string,
      text,
      created_at: new Date(),
    });
    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
