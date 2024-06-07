import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { IWorkspace, WorkspaceColumn } from "@/utils/@types/workspace";
import { fetchTasksForColumnId } from "@/lib/api/task";
import { TaskResponse } from "@/utils/@types/task";

export const useGetTasksByColumnId = (
  workspaceId: string,
  columnId: string,
  enabled: boolean
) => {
  const queryClient = useQueryClient();
  return useQuery<TaskResponse[], Error>({
    queryKey: [`column-${columnId}`],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchTasksForColumnId(workspaceId, columnId),
  }) as UseQueryResult<TaskResponse[], Error>;
};
