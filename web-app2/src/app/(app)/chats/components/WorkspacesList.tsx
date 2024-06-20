import React from "react";
import { cookies } from "next/headers";
import { IWorkspace } from "@/utils/@types/workspace";
import Workspace from "@/app/(app)/chats/components/Workspace";
import { clsx } from "clsx";
import { Input } from "@/components/ui/input";
import { SettingsIcon } from "lucide-react";

export const fetchWorkspaces = async () => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces?participated=true`,
    {
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};

async function WorkspacesList({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const data: IWorkspace[] = await fetchWorkspaces();

  return (
    <div className={clsx("h-full w-1/4 float-left")}>
      <div className="bg-white flex flex-row items-center justify-between p-4 border-r-2 border-gray-200 rounded-tl">
        <h4 className="text-xl font-bold capitalize ">workspaces</h4>
        <SettingsIcon className="w-6 h-6" />
      </div>
      <div className="flex flex-col h-full space-y-2 p-4 bg-gray-300">
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
    </div>
  );
}

export default WorkspacesList;
