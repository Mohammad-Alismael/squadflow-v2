import React from "react";
import WorkspaceCard from "@/app/(app)/workspaces/components/WorkspaceCard";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import WorkspaceList from "@/app/(app)/workspaces/components/WorkspaceList";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/app/(app)/workspaces/actions";

async function WorkspacesContainer({ viewType }: { viewType?: string }) {
  const data: IWorkspace[] = await fetchWorkspaces();
  return (
    <>
      {data.length === 0 && <NoWorkspacesFound />}
      {viewType && viewType === "list" && (
        <div className="py-4 w-full space-y-2">
          {data.map((val) => {
            return <WorkspaceList data={val} key={val._id} />;
          })}
        </div>
      )}
      {(!viewType || viewType === "cards") && (
        <div className="py-4 w-full grid grid-cols-4 grid-rows-2 gap-4 overflow-y-auto">
          {data.map((val) => {
            return <WorkspaceCard data={val} key={val._id} />;
          })}
        </div>
      )}
    </>
  );
}

export default WorkspacesContainer;
