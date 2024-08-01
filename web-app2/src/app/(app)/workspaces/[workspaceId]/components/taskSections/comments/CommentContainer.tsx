"use client";
import React, { useContext, useState } from "react";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { ICommentCreate, Comment as TComment } from "@/utils/@types/task";
import Comment from "./Comment";

import { USER_ROLES } from "@/utils/helper-client";
type CommentContainerProps = {
  comments: TComment[];
};
const CommentContainerContext = React.createContext<
  CommentContainerProps | undefined
>(undefined);

const useCommentContainerContext = () => {
  const context = useContext(CommentContainerContext);
  if (!context) {
    throw new Error(
      "useCommentContainerContext must be within CommentContainer"
    );
  }
  return context;
};
function CommentContainer({ children }: { children: React.ReactNode }) {
  const comments = useTaskPropertiesStore((state) => state.comments);
  return (
    <CommentContainerContext.Provider value={{ comments }}>
      <div className="relative flex flex-col items-center justify-between">
        <div className="space-y-2 w-full h-[30rem] overflow-y-auto">
          {comments.map((comment) => (
            <Comment key={comment._id} data={comment} />
          ))}
        </div>
        {children}
      </div>
    </CommentContainerContext.Provider>
  );
}
CommentContainer.AddCommentLocal = AddCommentLocal;

function AddCommentLocal({ userRole }: { userRole?: string | undefined }) {
  const { comments } = useCommentContainerContext();

  if (userRole !== USER_ROLES.viewer) return <AddCommentBar />;
  else return null;
}

export default CommentContainer;
