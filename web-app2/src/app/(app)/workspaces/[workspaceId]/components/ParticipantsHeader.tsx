import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspace } from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";

ParticipantsHeader.propTypes = {};

async function ParticipantsHeader({ workspaceId }: { workspaceId: string }) {
  const data: IWorkspace = await fetchWorkspace(workspaceId);

  return (
    <div className="flex items-center">
      {data &&
        data?.participants.map((participant) => (
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>{participant.user}</AvatarFallback>
          </Avatar>
        ))}
    </div>
  );
}

export default ParticipantsHeader;
