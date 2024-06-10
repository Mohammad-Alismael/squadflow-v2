import React from "react";
import { cookies } from "next/headers";
import { IWorkspace } from "@/utils/@types/workspace";
import Workspace from "@/app/(app)/chats/components/Workspace";
import { clsx } from "clsx";
import { Input } from "@/components/ui/input";

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
    <div className={clsx("h-full w-1/4 float-left bg-white")}>
      <div className="px-4 py-2 rounded">
        <Input type="text" placeholder="search" className="my-0.5" />
      </div>
      <div className="flex flex-col h-full space-y-2 px-4">
        <h4 className="text-xl font-bold capitalize ">workspaces</h4>
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
