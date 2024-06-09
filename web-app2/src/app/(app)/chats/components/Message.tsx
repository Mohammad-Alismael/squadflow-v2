"use client";
import React from "react";
import { useGetUserById } from "@/utils/hooks/user/useGetUserById";
import { MessageType } from "@/app/(app)/chats/components/MessagesContainer";
import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Message({
  data,
  currentUserId,
}: {
  data: MessageType;
  currentUserId: string;
}) {
  const { data: userData, isLoading } = useGetUserById(data.created_by);
  if (isLoading) return <p>loading ...</p>;
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
          <p className="text-sm">{userData?.username}</p>
          <p>{data.text}</p>
          <span className="text-sm">
            {Date(data.timestamp.toString()).toString()}
          </span>
        </div>
      </div>
    );
}

export default Message;
