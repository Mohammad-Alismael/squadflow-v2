import { useMutation, useQueryClient } from "react-query";
import { handleUpdateTask } from "@/utils/actions/workspace-actions";
import { toast } from "@/components/ui/use-toast";
import { revalidateURL } from "@/components/Dialogs/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

export const useUpdateTask = (workspaceId: string, revertBackTo: string) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const reset = useTaskPropertiesStore((state) => state.resetState);

  return useMutation({
    mutationFn: async (data: any) => await handleUpdateTask(data),
    onSuccess: async () => {
      toast({
        title: `Successfully updated task`,
      });
      await queryClient.invalidateQueries([`tasks-${workspaceId}`]);
      revalidateURL(workspaceId as string);
      const params = new URLSearchParams(searchParams);

      // Set the new value for "messageKeyword"
      params.delete("taskId");
      router.replace(`${revertBackTo}`);
      reset();
    },
    onError: (error: any) => {
      // handle error, e.g., show a toast notification
      toast({ title: error.message || "Error updating task" });
    },
    mutationKey: ["update-task"],
  });
};

export const useUpdateTaskv2 = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await handleUpdateTask(data),
    onSuccess,
    mutationKey: ["update-task"],
  });
};
