import React from "react";
import Workspace from "@/app/(app)/%5Fchats2/components/Workspace";
import { SettingsIcon } from "lucide-react";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";

async function WorkspacesList({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const data = await fetchWorkspaces();
  return (
    <>
      <div className="bg-white flex flex-row items-center justify-between p-4 border-r-2 border-gray-200 rounded-tl">
        <h4 className="text-xl font-bold capitalize ">workspaces</h4>
        <SettingsIcon className="w-6 h-6" />
      </div>
      <div className="flex-1 flex flex-col space-y-2 p-4 bg-gray-300 overflow-y-auto">
        {data.map((workspace) => {
          return (
            <Workspace
              key={workspace._id}
              workspace={JSON.parse(JSON.stringify(workspace))}
              selectedWorkspaceId={selectedWorkspaceId}
            />
          );
        })}
        {data.length === 0 && <p>there's no workspaces</p>}
      </div>
    </>
  );
}

export default WorkspacesList;
