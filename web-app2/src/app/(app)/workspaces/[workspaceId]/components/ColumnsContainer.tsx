"use client";
import React, { startTransition, useOptimistic } from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateColumnIdForTaskId } from "@/app/(app)/workspaces/[workspaceId]/actions";
import { TaskResponse } from "@/utils/@types/task";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
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
        const newOptimisticTasks = optimisticTasks.map((task: TaskResponse) => {
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
            className="w-full flex-1 flex flex-row gap-4"
            // className="w-full flex flex-row gap-4 bg-red-300"
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
                        (item: TaskResponse) =>
                          item.columnId === column._id &&
                          item.title.includes(
                            searchParams.get("keyword")
                              ? (searchParams.get("keyword") as string)
                              : ""
                          )
                      )}
                    />
                  );
                }
              )}
            {provided.placeholder}
            {/*<div className="flex flex-col gap-y-2 rounded-xl h-[36rem] w-1/4 bg-transparent p-3">*/}
            {/*  <Button className="w-full bg-green-700">+ new column</Button>*/}
            {/*</div>*/}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ColumnsContainer;
