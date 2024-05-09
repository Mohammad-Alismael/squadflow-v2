"use server";

import { redirect } from "next/navigation";

export const redirectToggle = (type: string) => {
  redirect(`/workspaces?view=${type}`);
};
