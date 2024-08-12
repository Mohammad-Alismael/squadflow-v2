"use client";
import React, { useOptimistic } from "react";
import DNDColumn from "@/components/Dialogs/components/DNDColumn";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function DndColumnContainer({ columns }: { columns: WorkspaceColumn[] }) {
  const [optimisticColumns, setOptimisticColumns] = useOptimistic(columns);

  const handleOnDragEnd = async (result: any) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    console.log({ source, destination, draggableId });
    const newColumns = Array.from(columns);
    const [movedColumn] = newColumns.splice(source.index, 1);
    console.log({
      source: source.index,
      destination: destination.index,
      draggableId,
    });
    newColumns.splice(destination.index, 0, movedColumn);
    const a = newColumns.map((column, index) => ({
      ...column,
      order: index + 1,
    }));
    // setOptimisticColumns(a);
  };
  return (
    <div className="grid gap-2 py-4">
      {optimisticColumns.map((column: WorkspaceColumn) => (
        <DNDColumn key={column._id} data={column} />
      ))}
    </div>
  );
}

export default DndColumnContainer;
