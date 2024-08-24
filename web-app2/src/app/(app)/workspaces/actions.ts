"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  createWorkspace,
  deleteWorkspaceById,
  getWorkspacesByCommunityIdPopulatedWithUserId,
} from "@/lib/workspace";
import { ObjectId } from "mongodb";
import { getUserAuthFromJWT, handleError } from "@/utils/helper";
import { IWorkspace } from "@/utils/@types/workspace";
import { checkUserIdsExist } from "@/lib/users";
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const redirectToggle = (type: string) => {
  redirect(`/workspaces?view=${type}`);
};

export const handleCreateWorkspace = async (data: any) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();

  if (communityId === "") {
    throw new Error(
      "you must join a community first or you can create your onw community"
    );
  }

  const { title, participants } = data;
  const userIdsToCheck: string[] = data.participants.map(
    ({ user }: any) => user
  );
  const allExist = await checkUserIdsExist(userIdsToCheck);
  if (!allExist) throw new Error("some user participant id(s) aren't valid");

  const workspace = await createWorkspace({
    community: communityId,
    title,
    participants: [...participants, { user: userId, role: "admin" }],
    created_by: userId,
  });
  const cache = [...participants, { user: userId, role: "admin" }].map(
    async (item) => {
      await kv.set(`${workspace._id}_user_role_${item.user}`, item.role);
    }
  );
  await Promise.all(cache);
  revalidatePath("/workspaces");
};

export const revalidateWorkspacePath = () => {
  revalidatePath("/workspaces");
  revalidatePath("/dashboard");
};

export const handleDeleteWorkspace = async (id: string) => {
  await deleteWorkspaceById(new ObjectId(id));
  revalidatePath("/workspaces");
};

export const fetchWorkspaces = async () => {
  const payload = await getUserAuthFromJWT();
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  if (communityId === "") return [];
  const workspaces = await getWorkspacesByCommunityIdPopulatedWithUserId(
    communityId,
    userId
  );
  return workspaces as IWorkspace[];
};
