import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskResponse } from "@/utils/@types/task";

function Comment({ data }: { data: TaskResponse["comments"][0] }) {
  return (
    <div className="w-full bg-white rounded-2xl p-4 flex items-start gap-4 border-2 border-gray-200">
      <Avatar className="border w-10 h-10">
        <AvatarImage src={data.created_by.photoURL} alt="@shadcn" />
        <AvatarFallback>{data.created_by.username}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{data.created_by.username}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(data.created_at.toString()).toLocaleDateString()}
          </div>
        </div>
        <div className="text-gray-500 dark:text-gray-400">{data.text}</div>
      </div>
    </div>
  );
}

export default Comment;
