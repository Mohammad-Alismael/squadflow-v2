"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateURL = (id: string) => {
  revalidatePath(`/workspaces/${id}`);
  revalidateTag("tasks");
};
