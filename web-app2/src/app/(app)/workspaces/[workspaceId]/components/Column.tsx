"use client";
import React from "react";
import TaskCard from "../components/TaskCard";
import { ITask, TaskResponse } from "@/utils/@types/task";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import ColumnHeader from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeader";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useGetTasksByColumnId } from "@/utils/hooks/task/useGetTasksByColumnId";
import ColumnSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnSkeleton";
import { clsx } from "clsx";
import { useQueryClient } from "react-query";
function Column({
  data,
  workspaceId,
  tasks,
}: {
  data: WorkspaceColumn;
  tasks: any;
  workspaceId: string;
}) {
  return (
    <Draggable draggableId={data._id} index={data.order}>
      {(provided, snapshot) => (
        <div
          key={data._id}
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
                {tasks.map((task: TaskResponse, index: number) => {
                  return <TaskCard key={task._id} data={task} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateTaskDialog key={data._id} columnId={data._id} />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
