"use client";
import React from "react";
import TaskCard from "../components/TaskCard";
import { ITask, TaskResponse } from "@/utils/@types/task";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import ColumnHeader from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeader";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { clsx } from "clsx";
import { useGetWorkspacePrivilege } from "@/utils/hooks/workspace/useGetWorkspacePrivilege";
import { getRoleValue, USER_ROLES } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";
function Column({
  data,
  workspaceId,
  tasks,
}: {
  data: WorkspaceColumn;
  tasks: any;
  workspaceId: string;
}) {
  const { data: role, isLoading } = useGetWorkspacePrivilege(workspaceId);
  return (
    <Draggable draggableId={data._id} index={data.order}>
      {(provided, snapshot) => (
        <div
          key={data._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-col gap-y-2 rounded-xl h-[36rem] w-1/4 bg-gray-300 p-3"
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
          {isLoading && <Skeleton className="h-14 w-full" />}
          {!isLoading && role !== getRoleValue(USER_ROLES.viewer) && (
            <CreateTaskDialog key={data._id} columnId={data._id} />
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Column;
