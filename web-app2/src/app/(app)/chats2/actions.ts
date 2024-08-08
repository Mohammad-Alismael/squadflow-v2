"use server";
import { redirect } from "next/navigation";
export const redirectWorkspaceChat = (workspaceId: string) => {
  redirect(`/chats?workspaceId=${workspaceId}`);
};
