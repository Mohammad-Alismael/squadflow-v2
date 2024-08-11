import React from "react";
import dynamic from "next/dynamic";
const ColumnsContainer = dynamic(
  () =>
    import("@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer"),
  {
    ssr: false,
  }
);
import {
  fetchWorkspace,
  getTasksForWorkspace,
} from "@/utils/actions/workspace-actions";
import { WorkspaceColumn } from "@/utils/@types/workspace";

async function ColumnsWrapperServer({
  workspaceId,
  columns,
  tasks,
}: {
  workspaceId: string;
  columns: WorkspaceColumn[];
  tasks: any;
}) {
  return (
    <ColumnsContainer
      workspaceId={workspaceId}
      columns={JSON.parse(JSON.stringify(columns))}
      tasks={JSON.parse(JSON.stringify(tasks))}
    />
  );
}

export default ColumnsWrapperServer;
