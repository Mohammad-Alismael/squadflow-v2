import { useMutation, useQueryClient } from "react-query";
import { revalidateURL } from "@/components/Dialogs/actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { handleCreateTask } from "@/utils/actions/workspace-actions";
import { getErrorMessage } from "@/utils/helper-client";
import { useDialog } from "@/utils/store/DialogStore";

export const useCreateTask = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setOpen = useDialog((state) => state.open);

  const reset = useTaskPropertiesStore((state) => state.resetState);
  return useMutation({
    mutationFn: (data: any) => handleCreateTask(data),
    onSuccess: async () => {
      setOpen(false);
      toast({
        title: `successfully created task`,
      });
      router.replace(`/workspaces/${workspaceId}`);
      revalidateURL(workspaceId as string);
      await queryClient.invalidateQueries([
        workspaceId,
        `tasks-${workspaceId}`,
      ]);
      await queryClient.refetchQueries([workspaceId]);
      revalidateURL(workspaceId as string);
      reset();
    },
    onError: (error) => {
      toast({ title: getErrorMessage(error) });
    },
    mutationKey: ["create-task"],
  });
};
