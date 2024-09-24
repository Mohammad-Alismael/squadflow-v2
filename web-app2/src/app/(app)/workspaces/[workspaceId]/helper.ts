import { WorkspaceColumn } from "@/utils/@types/workspace";
import { MetaTaskResponse, TaskResponse } from "@/utils/@types/task";

export const swapColumns = (
  columns: WorkspaceColumn[],
  columnId: string,
  newOrder: number
) => {
  const columnToMove = columns.find((col) => col._id === columnId);
  const targetColumn = columns.find((col) => col.order === newOrder);

  if (!columnToMove || !targetColumn) return columns;

  [columnToMove.order, targetColumn.order] = [
    targetColumn.order,
    columnToMove.order,
  ];

  return columns.map((col) =>
    col._id === columnToMove._id || col._id === targetColumn._id
      ? col._id === columnToMove._id
        ? columnToMove
        : targetColumn
      : col
  );
};

const findColumn = (tasks: MetaTaskResponse[], columnId: string) => {
  const x = tasks.find((item) => item.columnId === columnId);
  return !!x;
};
export const moveTask = (
  tasks: MetaTaskResponse[],
  taskId: string,
  columnId: string
) => {
  const foundColumn = findColumn(tasks, columnId);
  const updatedTasks = tasks.map((task: MetaTaskResponse) => {
    if (task._id === taskId && foundColumn) {
      return { ...task, columnId: columnId };
    }
    return task;
  });

  return updatedTasks;
};
