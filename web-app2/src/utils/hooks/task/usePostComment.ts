import { useMutation, useQueryClient } from "react-query";
import { createWorkspaceLabel } from "@/lib/api/workspace";
import { createTask, postCommentByTaskId } from "@/lib/api/task";

export const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, text }: { taskId: string; text: string }) =>
      postCommentByTaskId(taskId, text),
    mutationKey: ["create-comment"],
  });
};
