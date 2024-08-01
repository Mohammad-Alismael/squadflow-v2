"use client";
import React, { useState } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { v4 as uuidv4 } from "uuid";
import { useGetUserAuth } from "@/utils/hooks/user/useGetUserAuth";
import { Skeleton } from "@/components/ui/skeleton";

AddCommentBar.propTypes = {};

function AddCommentBar() {
  const { addComment } = useTaskPropertiesStore();
  const [text, setText] = useState("");
  const { data: userData, isLoading } = useGetUserAuth();

  const handleAddComment = () => {
    !isLoading &&
      userData &&
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
        created_by: {
          _id: "",
          username: userData.username,
          email: userData.email,
          photoURL: userData.photoURL,
        },
      });
    setText("");
  };
  if (isLoading) return <Skeleton className="h-10 w-full" />;
  return (
    <div className="flex w-full gap-3 items-stretch my-2">
      <Avatar className="border w-10 h-10">
        <AvatarImage src={userData?.photoURL} alt="@shadcn" />
        <AvatarFallback>{userData?.username}</AvatarFallback>
      </Avatar>
      <div className="w-[90%]">
        <Input
          onKeyPress={(event) => {
            if (event.key === "Enter") handleAddComment();
          }}
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
        className="h-10 w-20 rounded-full bg-green-800 text-white hover:bg-blue-600 focus:outline-none"
      >
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}

export default AddCommentBar;
