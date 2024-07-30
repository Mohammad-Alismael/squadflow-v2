import { useQuery, UseQueryResult } from "react-query";
import { getTaskById, fetchTasksForColumnId } from "@/lib/api/task";
import { ITask, TaskResponse } from "@/utils/@types/task";
import { handleGetTaskById } from "@/utils/actions/workspace-actions";

export const useGetTasksById = (taskId: string) => {
  return useQuery<TaskResponse, Error>({
    queryKey: [`task-${taskId}`],
    enabled: !!taskId,
    refetchOnWindowFocus: false,
    retry: 3,
    queryFn: () => getTaskById(taskId),
  }) as UseQueryResult<TaskResponse, Error>;
};
