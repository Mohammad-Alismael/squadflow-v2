"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { initAdmin } from "@/lib/firebase-admin";
import { writeText } from "@/lib/firebase";

export const redirectWorkspaceChat = (workspaceId: string) => {
  redirect(`/chats?workspaceId=${workspaceId}`);
};

export const handleWriteMessage = async (form: FormData) => {
  const text = form.get("message");
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const uid = payload?._id;
  await initAdmin();
  await writeText(uid, text);
};
