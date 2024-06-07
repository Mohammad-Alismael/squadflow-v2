"use client";
import React, { useState } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

AddCommentBar.propTypes = {};

function AddCommentBar() {
  const { addComment } = useTaskPropertiesStore();
  const [text, setText] = useState("");
  const handleAddComment = () => {
    addComment({
      _id: uuidv4(),
      text,
      created_at: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      created_by: "user_auth_id",
    });
  };
  return (
    <div className="flex w-full gap-3 items-stretch my-2">
      <Avatar className="h-10 w-10 shrink-0">
        <img src="/placeholder.svg" alt="Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="w-[90%]">
        <Input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setText(e.target.value)}
          className="h-10 w-full rounded-full border border-gray-300 px-4 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <Button
        onClick={handleAddComment}
        type="submit"
        size="icon"
        className="h-10 w-20 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}

export default AddCommentBar;
