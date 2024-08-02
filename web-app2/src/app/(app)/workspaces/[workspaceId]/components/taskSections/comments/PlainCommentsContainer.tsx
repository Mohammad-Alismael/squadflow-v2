"use client";
import React from "react";
import PropTypes from "prop-types";
import Comment from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/Comment";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

function PlainCommentsContainer() {
  const comments = useTaskPropertiesStore((state) => state.comments);

  return (
    <div className="space-y-2 w-full h-[30rem] overflow-y-auto">
      {comments.map((comment) => (
        <Comment key={comment._id} data={comment} />
      ))}
    </div>
  );
}

export default PlainCommentsContainer;
