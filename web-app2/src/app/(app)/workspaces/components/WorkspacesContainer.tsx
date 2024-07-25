import React from "react";
import WorkspaceCard from "@/app/(app)/workspaces/components/WorkspaceCard";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import WorkspaceList from "@/app/(app)/workspaces/components/WorkspaceList";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/app/(app)/workspaces/actions";

async function WorkspacesContainer({ viewType }: { viewType?: string }) {
  const data: IWorkspace[] = await fetchWorkspaces();
  return (
    <div className="">
      {data.length === 0 && <NoWorkspacesFound />}
      {viewType && viewType === "list" && (
        <div className="py-4 w-full space-y-2">
          {data.map((val) => {
            return <WorkspaceList data={val} key={val._id} />;
          })}
        </div>
      )}
      {(!viewType || viewType === "cards") && (
        <div className="py-4 w-full flex flex-wrap lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:overflow-y-auto">
          {data.map((val) => {
            return <WorkspaceCard data={val} key={val._id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default WorkspacesContainer;
