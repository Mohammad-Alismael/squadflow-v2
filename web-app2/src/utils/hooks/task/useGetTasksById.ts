import { useQuery, UseQueryResult } from "react-query";
import { getTaskById, fetchTasksForColumnId } from "@/lib/api/task";
import { ITask, TaskResponse } from "@/utils/@types/task";

export const useGetTasksById = (taskId: string | null, enabled: boolean) => {
  return useQuery<TaskResponse, Error>({
    queryKey: [`task-${taskId}`],
    enabled: enabled && !!taskId,
    queryFn: () => {
      if (taskId) {
        return getTaskById(taskId);
      }
      return Promise.reject(new Error("No taskId provided"));
    },
  }) as UseQueryResult<TaskResponse, Error>;
};
