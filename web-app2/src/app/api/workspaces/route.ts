import { z } from "zod";
import { NextResponse } from "next/server";
import { createWorkspace } from "@/lib/workspace";

const postSchema = z.object({
  title: z.string("title should be a string"),
  participants: z.array(
    z
      .object({
        user: z.string(),
        role: z.enum(["admin", "editor", "viewer"]),
      })
      .refine((value) => ["admin", "editor", "viewer"].includes(value.role), {
        message: "role should be either admin or editor or viewer",
      })
  ),
});
export async function POST(request: Request) {
  const { title, participants } = await request.json();
  postSchema.safeParse({ title, participants });
  const validation = postSchema.safeParse({ title, participants });
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  if (!communityId || communityId === "")
    return NextResponse.json({
      message: "you must join a community first!",
    });
  const workspace = await createWorkspace({
    community: communityId,
    title,
    participants,
    created_by: userId,
  });
  return NextResponse.json({ workspaceId: workspace._id }, { status: 201 });
}
