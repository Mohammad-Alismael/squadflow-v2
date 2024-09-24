"use client";
import React, { startTransition, useOptimistic } from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateColumnsOrder } from "@/app/(app)/workspaces/[workspaceId]/actions";
import { MetaTaskResponse } from "@/utils/@types/task";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import {
  moveTask,
  swapColumns,
} from "@/app/(app)/workspaces/[workspaceId]/helper";

function ColumnsContainer({
  workspaceId,
  columns,
  tasks,
}: {
  workspaceId: string;
  columns: WorkspaceColumn[];
  tasks: MetaTaskResponse[];
}) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  const [optimisticColumns, setOptimisticColumns] = useOptimistic(columns);
  console.log("'ColumnsContainer' rendered");
  const handleOnDragEnd = async (result: any) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (type === "task" && source.droppableId === destination.droppableId)
      return;
    if (type === "column" && source.index === destination.index) return;

    const taskId = draggableId;
    const fromColumnId = source.droppableId;
    const columnId = destination.droppableId;

    if (type === "task") {
      // Wrap the state update with startTransition
      startTransition(() => {
        const newOptimisticTasks = moveTask(optimisticTasks, taskId, columnId);
        console.log({ newOptimisticTasks });
        setOptimisticTasks(newOptimisticTasks);
      });
      // await updateColumnIdForTaskId(taskId, columnId);
      // toast({ title: "successfully moved task" });
    }

    if (type === "column") {
      let res: WorkspaceColumn[] = [];
      startTransition(() => {
        res = swapColumns(columns, draggableId, destination.index);
        setOptimisticColumns(res);
      });
      await updateColumnsOrder(workspaceId, res);
      toast({ title: "successfully moved column" });
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full h-full flex flex-row gap-4 overflow-x-auto"
          >
            {optimisticColumns &&
              optimisticColumns
                .sort((a, b) => a.order - b.order)
                .map(
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
                          (item: MetaTaskResponse) =>
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
