"use server";
import { WORKSPACE_TABS } from "@/utils/helper-client";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateURL = (id: string) => {
  revalidatePath(`/workspaces/${id}`);
  revalidatePath(`/calendars?workspace=${id}`);
  revalidateTag("tasks");
};
