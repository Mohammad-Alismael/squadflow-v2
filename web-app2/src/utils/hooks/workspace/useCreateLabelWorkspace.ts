import { useMutation, useQueryClient } from "react-query";
import { createWorkspaceLabel } from "@/utils/actions/workspace-actions";
import { useToast } from "@/components/ui/use-toast";

export const useCreateLabelWorkspace = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: createMutation, isLoading } = useMutation({
    mutationFn: (data: { color: string; title: string }) =>
      createWorkspaceLabel(workspaceId, data),
    onSuccess: async () => {
      toast({
        title: `successfully created workspace label`,
      });
      await queryClient.invalidateQueries([`labels-${workspaceId}`]);
    },
    mutationKey: ["create-workspace-label"],
  });

  return { createMutation, isLoading };
};
