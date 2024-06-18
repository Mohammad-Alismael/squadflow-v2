import { useMutation, useQueryClient } from "react-query";
import { createWorkspaceLabel } from "@/lib/api/workspace";
import { createTask, updateTaskById } from "@/lib/api/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return updateTaskById(data.taskId, data);
    },
    onSuccess: async () => {},
    mutationKey: ["update-task"],
  });
};
