// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {validateSchema} from "@/lib/helper/route.helper";
import {getOrDeleteSchema} from "@/app/api/tasks/schema";
import {getTaskId} from "@/lib/tasks";

export async function GET(request, context) {
  const { params } = await context;
  const { taskId } = params;
  validateSchema(getOrDeleteSchema, { taskId });
  try {
    const task = await getTaskId(taskId);
    return NextResponse.json({
    comments: task.comments
  }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
        {
          message: e.message,
        },
        { status: 500 }
    );
}

export async function POST(request: Request) {
  const data = await request.json();
  // Do whatever you want
  return NextResponse.json({ message: "Hello World map" }, { status: 200 });
}
