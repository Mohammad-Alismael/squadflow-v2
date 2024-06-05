import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ICommentCreate } from "@/utils/@types/task";
import { useGetUserAuth } from "@/utils/hooks/user/useGetUserAuth";

function Comment({ data }: { data: ICommentCreate }) {
  return (
    <div className="w-full bg-white rounded-2xl p-4 flex items-start gap-4">
      <Avatar className="border w-10 h-10">
        <img src="" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">username</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {data.created_at.toString()}
          </div>
        </div>
        <div className="text-gray-500 dark:text-gray-400">{data.text}</div>
      </div>
    </div>
  );
}

export default Comment;
