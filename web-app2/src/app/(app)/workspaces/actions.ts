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
  revalidatePath("/workspaces");
};
export const handleUpdateWorkspace = async (form: any, workspaceId: string) => {
  // write error handling for this request
  const response = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(form),
    }
  );

  if (!response.ok) await handleError(response);
};

export const revalidateWorkspacePath = () => {
  revalidatePath("/workspaces");
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
