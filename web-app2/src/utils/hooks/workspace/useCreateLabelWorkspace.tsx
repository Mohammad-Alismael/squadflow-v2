import { useMutation, useQueryClient } from "react-query";
import { createWorkspaceLabel } from "@/lib/api/workspace";

export const useCreateLabelWorkspace = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { mutate: createMutation, isLoading } = useMutation({
    mutationFn: (data: { color: string; title: string }) =>
      createWorkspaceLabel(workspaceId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([`labels-${workspaceId}`]);
    },
    mutationKey: ["create-workspace-label"],
  });

  return { createMutation, isLoading };
};
