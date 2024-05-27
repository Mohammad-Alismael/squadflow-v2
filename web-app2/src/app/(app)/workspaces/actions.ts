"use server";

import { redirect } from "next/navigation";
import Workspace from "@/models/workspace";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { deleteWorkspaceById } from "@/lib/workspace";
import { ObjectId } from "mongodb";

export const redirectToggle = (type: string) => {
  redirect(`/workspaces?view=${type}`);
};

export const handleCreateWorkspace = async (form: FormData) => {
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

export const handleDeleteWorkspace = async (id: string) => {
  await deleteWorkspaceById(new ObjectId(id));
  revalidatePath("/workspaces");
};
