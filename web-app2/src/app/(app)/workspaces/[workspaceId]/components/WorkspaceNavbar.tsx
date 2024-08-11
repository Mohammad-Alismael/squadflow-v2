import React from "react";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { IWorkspace } from "@/utils/@types/workspace";
import ParticipantsHeader from "@/app/(app)/workspaces/[workspaceId]/components/ParticipantsHeader";
import { fetchWorkspace } from "@/utils/actions/workspace-actions";

async function WorkspaceNavbar({
  title,
  workspaceId,
}: {
  title: string;
  workspaceId: string;
}) {
  return (
    <Navbar>
      <div className="">
        <p className="text-2xl capitalize font-bold">{title}</p>
        <div className="flex flex-row gap-2">
          <ParticipantsHeader workspaceId={workspaceId} />
        </div>
      </div>
    </Navbar>
  );
}

export default WorkspaceNavbar;
