import React from "react";
import dynamic from "next/dynamic";
const ColumnsContainer = dynamic(
  () =>
    import("@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer"),
  {
    ssr: false,
  }
);

import { IWorkspace, WorkspaceColumn } from "@/utils/@types/workspace";
import { MetaTaskResponse } from "@/utils/@types/task";
import {
  fetchWorkspace,
  getTasksForWorkspace,
} from "@/utils/actions/workspace-actions";

async function ColumnsWrapperServer({ workspaceId }: { workspaceId: string }) {
  let data_ = fetchWorkspace(workspaceId);
  const tasks_ = getTasksForWorkspace(workspaceId);
  console.time("PromiseAllTime");
  const [data, tasks] = (await Promise.all([
    data_, // Fetch workspace data
    tasks_, // Conditionally fetch tasks
  ])) as [IWorkspace, MetaTaskResponse[]];

  console.timeEnd("PromiseAllTime");
  if (data)
    return (
      <ColumnsContainer
        workspaceId={workspaceId}
        columns={JSON.parse(JSON.stringify(data.columns))}
        tasks={JSON.parse(JSON.stringify(tasks))}
      />
    );
}

export default ColumnsWrapperServer;
