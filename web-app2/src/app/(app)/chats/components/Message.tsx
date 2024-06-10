"use client";
import React from "react";
import { useGetUserById } from "@/utils/hooks/user/useGetUserById";
import { MessageType } from "@/app/(app)/chats/components/MessagesContainer";
import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageSkeleton from "@/app/(app)/chats/components/MessageSkeleton";

function Message({
  data,
  currentUserId,
}: {
  data: MessageType;
  currentUserId: string;
}) {
  const { data: userData, isLoading } = useGetUserById(data.created_by);
  if (isLoading) return <MessageSkeleton />;
  if (userData)
    return (
      <div
        className={clsx(
          "flex flex-row items-start gap-2"
          // data.created_by !== currentUserId ? "self-start" : "self-end"
        )}
      >
        <Avatar>
          <AvatarImage src={userData.photoURL} />
          <AvatarFallback>{userData.username}</AvatarFallback>
        </Avatar>
        <div className="bg-white p-2 rounded-md">
          <p className="text-sm text-green-800">{userData?.username}</p>
          <p>{data.text}</p>
          <span className="text-sm opacity-50 self-end">
            {new Date(data.timestamp).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </span>
        </div>
      </div>
    );
}

export default Message;
