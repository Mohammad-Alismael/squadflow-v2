import { useMutation, useQueryClient } from "react-query";
import { handleUpdateTask } from "@/utils/actions/workspace-actions";
import { toast } from "@/components/ui/use-toast";
import { revalidateURL } from "@/components/Dialogs/actions";

export const useUpdateTask = (workspaceId: string, revertBackTo: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await handleUpdateTask(data),
    onSuccess: async () => {
      toast({
        title: `Successfully updated task`,
      });
      await queryClient.invalidateQueries([`tasks-${workspaceId}`]);
      revalidateURL(workspaceId as string);
      window.history.replaceState(null, "", revertBackTo);
    },
    onError: (error: any) => {
      // handle error, e.g., show a toast notification
      toast({ title: error.message || "Error updating task" });
    },
    mutationKey: ["update-task"],
  });
};
