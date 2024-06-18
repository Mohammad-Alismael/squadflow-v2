"use client";
import React, { startTransition, useEffect, useOptimistic } from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateColumnIdForTaskId } from "@/app/(app)/workspaces/[workspaceId]/actions";
import { TaskResponse } from "@/utils/@types/task";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { useToast } from "@/components/ui/use-toast";

function ColumnsContainer({
  workspaceId,
  columns,
  tasks,
}: {
  workspaceId: string;
  columns: WorkspaceColumn[];
  tasks: TaskResponse[];
}) {
  const { toast } = useToast();

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

  const handleOnDragEnd = async (result: any) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const taskId = draggableId;
    const fromColumnId = source.droppableId;
    const toColumnId = destination.droppableId;

    if (type === "task") {
      // Wrap the state update with startTransition
      startTransition(() => {
        const newOptimisticTasks = optimisticTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, columnId: toColumnId };
          } else return task;
        });
        setOptimisticTasks(newOptimisticTasks);
        toast({ title: "successfully moved task" });
      });
      await updateColumnIdForTaskId(taskId, toColumnId);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-[84.5%] flex flex-row gap-4 py-2"
          >
            {columns &&
              columns.map(
                (column: {
                  _id: string;
                  order: number;
                  title: string;
                  color: string;
                }) => {
                  return (
                    <Column
                      key={column._id}
                      workspaceId={workspaceId}
                      data={column}
                      tasks={optimisticTasks?.filter(
                        (item) => item.columnId === column._id
                      )}
                    />
                  );
                }
              )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ColumnsContainer;
