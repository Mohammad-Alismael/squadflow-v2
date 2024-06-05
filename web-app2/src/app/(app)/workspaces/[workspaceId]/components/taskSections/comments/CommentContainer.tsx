"use client";
import React from "react";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import AuthComment from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AuthComment";
import Comment from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/Comment";

function CommentContainer() {
  const comments = useTaskPropertiesStore((state) => state.comments);
  return (
    <div className="relative h-full flex flex-col items-center justify-between">
      <div className="space-y-2 w-full">
        {comments.map((comment) =>
          comment.created_by === "user_auth_id" ? (
            <AuthComment text={comment.text} created_at={comment.created_at} />
          ) : (
            <Comment key={comment._id} data={comment} />
          )
        )}
      </div>
      <AddCommentBar />
    </div>
  );
}

export default CommentContainer;
