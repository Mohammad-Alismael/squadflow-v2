import React from "react";
import Navbar from "@/components/Navbar";
import ParticipantsHeader from "@/app/(app)/workspaces/[workspaceId]/components/ParticipantsHeader";
import { fetchWorkspace } from "@/utils/actions/workspace-actions";

async function WorkspaceNavbar({ workspaceId }: { workspaceId: string }) {
  let data = await fetchWorkspace(workspaceId);
  if (data)
    return (
      <Navbar>
        <div className="">
          <p className="text-2xl capitalize font-bold truncate w-56 sm:w-auto">
            {data.title}
          </p>
          <div className="flex flex-row gap-2">
            <ParticipantsHeader workspaceId={workspaceId} />
          </div>
        </div>
      </Navbar>
    );
}

export default WorkspaceNavbar;
