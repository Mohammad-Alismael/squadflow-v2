"use client";
import React, { useContext, useState } from "react";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import AuthComment from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AuthComment";
import { ICommentCreate } from "@/utils/@types/task";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { usePostComment } from "@/utils/hooks/task/usePostComment";
import { USER_ROLES } from "@/utils/helper";
type CommentContainerProps = {
  comments: ICommentCreate[];
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
          {comments.map((comment) =>
            comment.created_by === "user_auth_id" ? (
              <AuthComment
                key={comment._id}
                text={comment.text}
                created_at={comment.created_at as string}
              />
            ) : (
              <Comment key={comment._id} data={comment} />
            )
          )}
        </div>
        {children}
      </div>
    </CommentContainerContext.Provider>
  );
}
CommentContainer.AddCommentLocal = AddCommentLocal;

function AddCommentLocal({ userRole }: { userRole: string | undefined }) {
  if (userRole !== USER_ROLES.viewer) return <AddCommentBar />;
  else return null;
}

function AddCommentServer() {
  const { comments } = useCommentContainerContext();
  // const [optimisticComments, setOptimisticComments] = useOptimistic(comments);
  const taskId = useTaskPropertiesStore((state) => state.taskId);

  const {
    mutate: createMutation,
    isLoading,
    error,
    isError,
    isSuccess,
  } = usePostComment();

  const { addComment } = useTaskPropertiesStore();
  const [text, setText] = useState("");
  const handleAddComment = () => {
    const commentObject = {
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
    };
    createMutation({ taskId, text });
    addComment(commentObject);
  };
  if (isLoading) return <p>loading ...</p>;
  return (
    <div className="flex w-full gap-3 items-stretch my-2">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback>JD</AvatarFallback>
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
CommentContainer.AddCommentServer = AddCommentServer;
export default CommentContainer;
