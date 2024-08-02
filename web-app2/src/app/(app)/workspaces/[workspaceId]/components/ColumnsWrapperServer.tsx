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
import ColumnsWrapperClient from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsWrapperClient";

async function ColumnsWrapperServer({ workspaceId }: { workspaceId: string }) {
  const workspace = fetchWorkspace(workspaceId);
  // const workspaceTasks = getTasksForWorkspace(workspaceId);
  // const [columns_, tasks] = await Promise.all([workspace, workspaceTasks]);
  const [columns_] = await Promise.all([workspace]);
  // you need to serialize the data if you are passing from server to client component
  return (
    <ColumnsWrapperClient // i want to do polling
      workspaceId={workspaceId}
      columns={JSON.parse(JSON.stringify(columns_.columns))}
    />
  );
  // return (
  //   <ColumnsContainer
  //     workspaceId={workspaceId}
  //     columns={JSON.parse(JSON.stringify(columns_.columns))}
  //     tasks={JSON.parse(JSON.stringify(tasks))}
  //   />
  // );
}

export default ColumnsWrapperServer;
