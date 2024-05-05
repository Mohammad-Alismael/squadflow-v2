import { z } from "zod";
import { NextResponse } from "next/server";
import { createWorkspace } from "@/lib/workspace";
import { validateCommunity } from "@/lib/helper/route.helper";
import { checkUserIdsExist } from "@/lib/users";

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
  const userId = request.headers.get("uid") as string;
  const communityId = request.headers.get("cid") as string;
  validateCommunity(communityId);
  const userIdsToCheck: string[] = participants.map(({ user }) => user);
  const allExist = await checkUserIdsExist(userIdsToCheck);
  if (!allExist)
    return NextResponse.json(
      { message: "some user participant id(s) aren't valid" },
      { status: 400 }
    );

  const workspace = await createWorkspace({
    community: communityId,
    title,
    participants,
    created_by: userId,
  });
  return NextResponse.json({ workspaceId: workspace._id }, { status: 201 });
}
