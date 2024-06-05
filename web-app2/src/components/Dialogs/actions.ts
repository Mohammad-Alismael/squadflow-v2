"use server";
import { revalidatePath } from "next/cache";

export const revalidateURL = (id: string) => {
  revalidatePath(`/workspaces/${id}`);
};
