import { useQuery, UseQueryResult } from "react-query";
import { fetchTasksForColumnId } from "@/lib/api/task";
import { TaskResponse } from "@/utils/@types/task";

export const useGetTasksByColumnId = (
  workspaceId: string,
  columnId: string,
  enabled: boolean
) => {
  return useQuery<TaskResponse[], Error>({
    queryKey: [`column-${columnId}`],
    enabled,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    staleTime: 0,
    cacheTime: 0,
    onSuccess: () => {
      console.log(`column-${columnId}`, "lol");
    },
    queryFn: () => fetchTasksForColumnId(workspaceId, columnId),
  }) as UseQueryResult<TaskResponse[], Error>;
};
