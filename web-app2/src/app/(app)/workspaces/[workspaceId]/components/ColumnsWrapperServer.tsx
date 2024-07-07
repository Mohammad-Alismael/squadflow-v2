"use client";
import React from "react";
import ColumnsContainer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer";
import { useGetTasksByWorkspaceId } from "@/utils/hooks/workspace/useGetTasksByWorkspaceId";
import Loading from "@/app/(app)/workspaces/[workspaceId]/loading";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import ColumnSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnSkeleton";
import { getTasksForWorkspace } from "@/utils/actions/workspace-actions";

async function ColumnsWrapperServer({
  workspaceId,
  columns,
}: {
  workspaceId: string;
  columns: WorkspaceColumn[];
}) {
  const workspaceTasks = await getTasksForWorkspace(workspaceId);

  return (
    <ColumnsContainer
      workspaceId={workspaceId}
      columns={columns}
      tasks={workspaceTasks}
    />
  );
}

export default ColumnsWrapperServer;
