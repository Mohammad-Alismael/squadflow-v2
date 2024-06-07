"use client";
import React from "react";
import TaskCard from "../components/TaskCard";
import { MoreVertical } from "react-feather";
import { Button } from "@/components/ui/button";
import { ITask, TaskResponse } from "@/utils/@types/task";
import { cookies } from "next/headers";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import ColumnHeader from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeader";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useGetTasksByColumnId } from "@/utils/hooks/task/useGetTasksByColumnId";
import ColumnSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnSkeleton";
import { clsx } from "clsx";
// const fetchTasksForColumnId = async (workspaceId: string, columnId: string) => {
//   const res = await fetch(
//     `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks?columnId=${columnId}`,
//     {
//       next: { tags: [`column-${columnId}`] },
//       method: "GET",
//       headers: { Cookie: cookies().toString() },
//       cache: "no-cache",
//     }
//   );
//   if (res.ok) {
//     return res.json();
//   }
//   return [];
// };
function Column({
  data,
  workspaceId,
}: {
  data: WorkspaceColumn;
  workspaceId: string;
}) {
  const { data: tasks, isLoading } = useGetTasksByColumnId(
    workspaceId,
    data?._id,
    true
  );
  if (isLoading) return <ColumnSkeleton />;
  if (!tasks) return null;
  return (
    <Draggable draggableId={data._id} index={data.order}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="rounded-xl h-full w-1/4 bg-gray-300 p-4"
        >
          <ColumnHeader
            length={tasks.length}
            data={data}
            {...provided.dragHandleProps}
          />
          <Droppable droppableId={data._id} type="task">
            {(provided, snapshot) => (
              <div
                className={clsx(
                  "tasks-container",
                  snapshot.isDraggingOver && ""
                )}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task: TaskResponse, index) => {
                  return <TaskCard key={task._id} data={task} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateTaskDialog columnId={data._id} />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
