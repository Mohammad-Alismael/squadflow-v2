"use client";
import React from "react";
import TaskCard from "../components/TaskCard";
import { TaskResponse } from "@/utils/@types/task";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import ColumnHeader from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeader";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { clsx } from "clsx";
import { useGetWorkspacePrivilege } from "@/utils/hooks/workspace/useGetWorkspacePrivilege";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoleValue, USER_ROLES } from "@/utils/helper-client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useDialog } from "@/utils/store/DialogStore";
function Column({
  data,
  workspaceId,
  tasks,
}: {
  data: WorkspaceColumn;
  tasks: TaskResponse[];
  workspaceId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setOpen = useDialog((state) => state.open);

  const handleOpenCreateTaskDialog = () => {
    const params = new URLSearchParams(searchParams);
    // Set the new value for "messageKeyword"
    params.set("columnId", data._id);
    router.replace(`/workspaces/${workspaceId}?${params.toString()}`);
    // router.replace(`/workspaces/${workspaceId}/${data._id}/add-task`);
    setOpen(true);
  };

  const { data: role, isLoading } = useGetWorkspacePrivilege(workspaceId);
  return (
    <Draggable draggableId={data._id} index={data.order}>
      {(provided, snapshot) => (
        <div
          key={data._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-col gap-y-0 rounded-xl h-[36rem] min-w-80 sm:w-auto bg-gray-300 p-3"
        >
          <ColumnHeader
            length={tasks.length}
            workspaceId={workspaceId}
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
                  return (
                    <TaskCard
                      key={task._id}
                      workspaceId={workspaceId}
                      data={task}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {isLoading && <Skeleton className="h-14 w-full" />}
          {!isLoading && role !== getRoleValue(USER_ROLES.viewer) && (
            <Button
              className="w-full bg-green-700"
              onClick={handleOpenCreateTaskDialog}
            >
              + task card
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Column;
