"use client";
import React from "react";
import { useGetUserById } from "@/utils/hooks/user/useGetUserById";
import { MessageType } from "@/app/(app)/chats/components/MessagesContainer";
import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function MessageSkeleton() {
  return (
    <div
      className={clsx(
        "flex flex-row items-start gap-2"
        // data.created_by !== currentUserId ? "self-start" : "self-end"
      )}
    >
      <Skeleton className="h-12 w-12 rounded-full" />

      <div className="space-y-2 bg-white p-2 rounded-md">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
  );
}

export default MessageSkeleton;
