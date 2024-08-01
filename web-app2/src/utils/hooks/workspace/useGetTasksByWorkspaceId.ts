import { useQuery, UseQueryResult } from "react-query";
import { fetchTasksForColumnId, fetchTasksForWorkspace } from "@/lib/api/task";
import { TaskResponse } from "@/utils/@types/task";

export const useGetTasksByWorkspaceId = (
  workspaceId: string,
  enabled: boolean
) => {
  return useQuery<TaskResponse[], Error>({
    queryKey: [`tasks-${workspaceId}`],
    enabled,
    refetchInterval: 4000,
    queryFn: () => fetchTasksForWorkspace(workspaceId),
  }) as UseQueryResult<TaskResponse[], Error>;
};
