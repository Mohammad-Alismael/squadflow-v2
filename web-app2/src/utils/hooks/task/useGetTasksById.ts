import { useQuery, UseQueryResult } from "react-query";
import { getTaskById, fetchTasksForColumnId } from "@/lib/api/task";
import { ITask, TaskResponse } from "@/utils/@types/task";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

export const useGetTasksById = (workspaceId: string, taskId: string) => {
  const resetCustomState = useTaskPropertiesStore(
    (state) => state.resetCustomState
  );
  return useQuery<TaskResponse, Error>({
    queryKey: [`task-${taskId}`],
    enabled: !!taskId,
    refetchOnWindowFocus: false,
    retry: 3,
    onSuccess: (data) => {
      const {
        title,
        dueDate,
        dueTime,
        columnId,
        comments,
        priority,
        participants,
        labels,
        description,
        attachments,
        _id,
      } = data;
      resetCustomState({
        title,
        projectId: workspaceId,
        taskDate: dueDate,
        endTime: dueTime,
        columnId,
        comments,
        priority,
        participants,
        labels,
        description,
        attachments,
        taskId: _id,
      });
    },
    queryFn: () => getTaskById(taskId),
  }) as UseQueryResult<TaskResponse, Error>;
};
