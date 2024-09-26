import { useQuery, UseQueryResult } from "react-query";
import { fetchTasksForColumnId, fetchTasksForWorkspace } from "@/lib/api/task";
import { MetaTaskResponse, TaskResponse } from "@/utils/@types/task";

export const useGetTasksByWorkspaceId = (
  workspaceId: string,
  enabled: boolean
) => {
  return useQuery<MetaTaskResponse[], Error>({
    queryKey: [`tasks-${workspaceId}`],
    enabled,
    refetchInterval: 4000,
    queryFn: () => fetchTasksForWorkspace(workspaceId),
  }) as UseQueryResult<MetaTaskResponse[], Error>;
};
