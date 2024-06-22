"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateURL = (id: string) => {
  // revalidatePath(`/workspaces/${id}`);
  revalidatePath(`/calendars?workspace=${id}`);
  revalidateTag("tasks");
};
