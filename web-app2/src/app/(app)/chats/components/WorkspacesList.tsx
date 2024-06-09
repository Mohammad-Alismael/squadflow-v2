import React from "react";
import { cookies } from "next/headers";
import { IWorkspace } from "@/utils/@types/workspace";
import Workspace from "@/app/(app)/chats/components/Workspace";

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

async function WorkspacesList(props) {
  const data: IWorkspace[] = await fetchWorkspaces();

  return (
    <div className="flex flex-col h-full w-1/4 float-left space-y-2">
      <h4>workspace chats</h4>
      {data.map((workspace) => {
        return <Workspace key={workspace._id} workspace={workspace} />;
      })}
    </div>
  );
}

export default WorkspacesList;
