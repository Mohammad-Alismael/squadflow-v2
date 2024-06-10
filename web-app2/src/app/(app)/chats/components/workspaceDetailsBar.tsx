import React from "react";
import PropTypes from "prop-types";
import { getWorkspaceByIdPopulated } from "@/lib/workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

WorkspaceDetailsBar.propTypes = {};

async function WorkspaceDetailsBar({ workspaceId }: { workspaceId: string }) {
  const workspace =
    workspaceId && (await getWorkspaceByIdPopulated(workspaceId));
  if (workspace)
    return (
      <div className="bg-white px-4 py-2 rounded">
        <p>{workspace.title}</p>
        <p className="text-sm opacity-70">
          {workspace.participants
            .map((participant) => participant.user.username)
            .join(",")}
        </p>
      </div>
    );
}

export default WorkspaceDetailsBar;
