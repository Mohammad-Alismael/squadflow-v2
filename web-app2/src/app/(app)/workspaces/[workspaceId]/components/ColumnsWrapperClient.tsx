"use client";
import React from "react";
import ColumnsContainer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer";
import { useGetTasksByWorkspaceId } from "@/utils/hooks/workspace/useGetTasksByWorkspaceId";
import Loading from "@/app/(app)/workspaces/[workspaceId]/loading";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import ColumnSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnSkeleton";

function ColumnsWrapperClient({
  workspaceId,
  columns,
}: {
  workspaceId: string;
  columns: WorkspaceColumn[];
}) {
  const { data: tasks, isLoading } = useGetTasksByWorkspaceId(
    workspaceId,
    true
  );
  if (isLoading)
    return (
      <div className="h-[84.5%] flex flex-row gap-4 py-2">
        {columns.map((column) => (
          <ColumnSkeleton key={column._id} />
        ))}
      </div>
    );
  if (tasks)
    return (
      <ColumnsContainer
        workspaceId={workspaceId}
        columns={columns}
        tasks={tasks}
      />
    );
}

export default ColumnsWrapperClient;
