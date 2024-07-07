import React from "react";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { IWorkspace } from "@/utils/@types/workspace";
import ParticipantsHeader from "@/app/(app)/workspaces/[workspaceId]/components/ParticipantsHeader";

export const fetchWorkspace = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return null;
};

async function WorkspaceNavbar({ workspaceId }: { workspaceId: string }) {
  const data: IWorkspace = await fetchWorkspace(workspaceId);
  return (
    <Navbar>
      <div className="">
        <p className="text-2xl capitalize font-bold">{data?.title}</p>
        <div className="flex flex-row gap-2">
          <ParticipantsHeader workspaceId={workspaceId} />
        </div>
      </div>
    </Navbar>
  );
}

export default WorkspaceNavbar;
