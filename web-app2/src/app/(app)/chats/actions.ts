"use server";
import { redirect } from "next/navigation";
import {
  MessageType,
  MessageTypeWithUserData,
} from "@/app/(app)/chats/components/MessagesContainer";
import { kv } from "@vercel/kv";
import { findUserById } from "@/lib/users";
export const redirectWorkspaceChat = (workspaceId: string) => {
  redirect(`/chats?workspaceId=${workspaceId}`);
};

export const addUserDataToMessages = async (messages: MessageType[]) => {
  try {
    const list = await Promise.all(
      messages.map(async (message: MessageType) => {
        try {
          const userData = await kv.get(`user_${message.created_by}`);
          if (userData) {
            console.log("cache hit");
            return { ...message, user: userData };
          } else {
            console.log("cache miss");
            const user = await findUserById(message.created_by);
            await kv.set(`user_${message.created_by}`, user);
            return { ...message, user };
          }
        } catch (error) {
          console.error(
            `Failed to process message ${message.messageId}:`,
            error
          );
          return null; // Return null or handle the error as needed
        }
      })
    );

    // Filter out any null values in case of errors
    return list.filter((item) => item !== null) as MessageTypeWithUserData[];
  } catch (error) {
    console.error("Failed to process messages:", error);
    throw error; // Re-throw or handle the error as needed
  }
};

export const validateUserData = async (userId: string) => {
  try {
    const userData = await kv.get(`user_${userId}`);
    console.log({ userData });
    if (!userData) {
      const user = await findUserById(userId);
      await kv.set(`user_${userId}`, user);
    }
  } catch (error) {
    console.error(`Failed to process message`, error);
  }
};
