"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  deleteWorkspaceById,
  getWorkspacesByCommunityIdPopulated,
  getWorkspacesByCommunityIdPopulatedWithUserId,
} from "@/lib/workspace";
import { ObjectId } from "mongodb";
import { handleError } from "@/utils/helper";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { IWorkspace } from "@/utils/@types/workspace";

export const redirectToggle = (type: string) => {
  redirect(`/workspaces?view=${type}`);
};

export const handleCreateWorkspace = async (form: any) => {
  const response = await fetch(`${process.env.URL_API_ROUTE}/api/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();
  revalidatePath("/workspaces");
  return data;
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
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  if (communityId === "") return [];
  const workspaces = await getWorkspacesByCommunityIdPopulatedWithUserId(
    communityId,
    userId
  );
  return workspaces as IWorkspace[];
};
