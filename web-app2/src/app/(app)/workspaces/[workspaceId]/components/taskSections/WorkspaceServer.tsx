import React from "react";
import { IWorkspace } from "@/utils/@types/workspace";
import Workspace from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Workspace";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";

async function WorkspaceServer() {
  const data: IWorkspace[] = await fetchWorkspaces();
  return (
    <div className="flex flex-row items-center gap-4">
      <h3 className="font-bold">workspace</h3>
      <Workspace data={JSON.parse(JSON.stringify(data))} />
    </div>
  );
}

export default WorkspaceServer;
