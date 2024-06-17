import { useQuery, UseQueryResult } from "react-query";
import { fetchTaskById, fetchTasksForColumnId } from "@/lib/api/task";
import { ITask, TaskResponse } from "@/utils/@types/task";

export const useGetTasksById = (taskId: string | null, enabled: boolean) => {
  return useQuery<ITask, Error>({
    queryKey: [`task-${taskId}`],
    enabled: enabled && !!taskId,
    queryFn: () => {
      if (taskId) {
        return fetchTaskById(taskId);
      }
      return Promise.reject(new Error("No taskId provided"));
    },
  }) as UseQueryResult<ITask, Error>;
};
