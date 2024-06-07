"use client";
import React from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function ColumnsContainer({ workspace }: { workspace: any }) {
  const handleOnDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;
    console.log(type);
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    const taskId = draggableId;
    const fromColumnId = source.droppableId;
    const toColumnId = destination.droppableId;
    console.log({ taskId, fromColumnId, toColumnId });
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
            {workspace &&
              workspace?.columns.map(
                (column: {
                  _id: string;
                  order: number;
                  title: string;
                  color: string;
                }) => {
                  return (
                    <Column
                      key={column._id}
                      workspaceId={workspace._id}
                      data={column}
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
