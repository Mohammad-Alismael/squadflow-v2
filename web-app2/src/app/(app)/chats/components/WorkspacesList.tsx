import React from "react";
import { IWorkspace } from "@/utils/@types/workspace";
import Workspace from "@/app/(app)/chats/components/Workspace";
import { SettingsIcon } from "lucide-react";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";

async function WorkspacesList({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const data: IWorkspace[] = await fetchWorkspaces();

  return (
    <>
      <div className="bg-white flex flex-row items-center justify-between p-4 border-r-2 border-gray-200 rounded-tl">
        <h4 className="text-xl font-bold capitalize ">workspaces</h4>
        <SettingsIcon className="w-6 h-6" />
      </div>
      <div className="flex-1 flex flex-col space-y-2 p-4 bg-gray-300">
        {data.map((workspace) => {
          return (
            <Workspace
              key={workspace._id}
              workspace={workspace}
              selectedWorkspaceId={selectedWorkspaceId}
            />
          );
        })}
      </div>
    </>
  );
}

export default WorkspacesList;
