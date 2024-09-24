import React from "react";
import WorkspaceCard from "@/app/(app)/workspaces/components/WorkspaceCard";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import WorkspaceList from "@/app/(app)/workspaces/components/WorkspaceList";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/app/(app)/workspaces/actions";
import { fetchMetaWorkspaces } from "@/utils/actions/workspace-actions";

const filterData = (sortType: string, data: IWorkspace[]) => {
  switch (sortType) {
    case "accedning":
      return data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      });
    case "alphabticaly":
      return data.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    case "decending":
      return data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        return 0;
      });
    default:
      return data;
  }
};

async function WorkspacesContainer({
  viewType,
  sortType,
}: {
  viewType?: string;
  sortType?: string;
}) {
  const data: IWorkspace[] = await fetchMetaWorkspaces();
  return (
    <div className="h-[85vh] overflow-y-auto">
      {data.length === 0 && <NoWorkspacesFound />}
      {viewType && viewType === "list" && (
        <div className="py-4 w-full space-y-2">
          {filterData(sortType as string, data).map((val) => {
            return (
              <WorkspaceList
                data={JSON.parse(JSON.stringify(val))}
                key={val._id}
              />
            );
          })}
        </div>
      )}
      {(!viewType || viewType === "cards") && (
        <div className="py-4 w-full flex flex-wrap lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:overflow-y-auto">
          {filterData(sortType as string, data).map((val) => {
            return (
              <WorkspaceCard
                data={JSON.parse(JSON.stringify(val))}
                key={val._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WorkspacesContainer;
