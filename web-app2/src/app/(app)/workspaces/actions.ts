"use server";

import { redirect } from "next/navigation";
import Workspace from "@/models/workspace";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { deleteWorkspaceById } from "@/lib/workspace";
import { ObjectId } from "mongodb";
import { handleError } from "@/utils/helper";

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
