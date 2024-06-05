import { useMutation, useQueryClient } from "react-query";
import { createWorkspaceLabel } from "@/lib/api/workspace";
import { createTask } from "@/lib/api/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createTask(data),
    onSuccess: async () => {},
    mutationKey: ["create-task"],
  });
};
