import React from "react";
import Navbar from "@/components/Navbar";
import ParticipantsHeader from "@/app/(app)/workspaces/[workspaceId]/components/ParticipantsHeader";

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
        <p className="text-2xl capitalize font-bold truncate w-56 sm:w-auto">
          {title}
        </p>
        <div className="flex flex-row gap-2">
          <ParticipantsHeader workspaceId={workspaceId} />
        </div>
      </div>
    </Navbar>
  );
}

export default WorkspaceNavbar;
