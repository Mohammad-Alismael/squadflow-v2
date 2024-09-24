import React from "react";
import dynamic from "next/dynamic";
const ColumnsContainer = dynamic(
  () =>
    import("@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer"),
  {
    ssr: false,
  }
);

import { WorkspaceColumn } from "@/utils/@types/workspace";
import { MetaTaskResponse, TaskResponse } from "@/utils/@types/task";
import { getTasksForWorkspace } from "@/utils/actions/workspace-actions";

async function ColumnsWrapperServer({
  workspaceId,
  columns,
}: {
  workspaceId: string;
  columns: WorkspaceColumn[];
}) {
  const tasks = (await getTasksForWorkspace(workspaceId)) as MetaTaskResponse[];

  return (
    <ColumnsContainer
      workspaceId={workspaceId}
      columns={JSON.parse(JSON.stringify(columns))}
      tasks={JSON.parse(JSON.stringify(tasks))}
    />
  );
}

export default ColumnsWrapperServer;
