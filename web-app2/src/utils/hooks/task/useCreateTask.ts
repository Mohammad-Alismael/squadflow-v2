import { useMutation, useQueryClient } from "react-query";
import { createWorkspaceLabel } from "@/lib/api/workspace";
import { createTask } from "@/lib/api/task";
import { revalidateURL } from "@/components/Dialogs/actions";
import { toast } from "@/components/ui/use-toast";

export const useCreateTask = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createTask(data),
    onSuccess: async () => {
      toast({
        title: `successfully created task`,
      });
      await queryClient.invalidateQueries([workspaceId]);
      await queryClient.refetchQueries([workspaceId]);
      revalidateURL(workspaceId as string);
    },
    mutationKey: ["create-task"],
  });
};
