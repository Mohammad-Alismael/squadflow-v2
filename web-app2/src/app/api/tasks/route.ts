// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { createTask } from "@/lib/tasks";
import { validateSchema } from "@/lib/helper/route.helper";
import { postSchema } from "@/app/api/tasks/schema";
import { getWorkspaceById } from "@/lib/workspace";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const data = await request.json();
  validateSchema(postSchema, data);
  const userId = request.headers.get("uid");
  try {
    console.log(data);
    data.comments = data.comments.map((item) => {
      const x = item;
      delete x["_id"];
      delete x["created_at"];
      x["created_by"] = userId as string;
      return x;
    });
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
