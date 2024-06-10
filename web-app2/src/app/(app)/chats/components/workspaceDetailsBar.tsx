import React from "react";
import PropTypes from "prop-types";
import { getWorkspaceByIdPopulated } from "@/lib/workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import SearchMessageInput from "@/app/(app)/chats/components/SearchMessageInput";

async function WorkspaceDetailsBar({ workspaceId }: { workspaceId: string }) {
  const workspace =
    workspaceId && (await getWorkspaceByIdPopulated(workspaceId));

  if (workspace)
    return (
      <div className="flex justify-between items-center bg-white px-4 py-2 rounded-t">
        <div>
          <p className="font-bold">{workspace.title}</p>
          <p className="text-sm opacity-70">
            {workspace.participants
              .map((participant) => participant.user.username)
              .join(",")}
          </p>
        </div>
        <SearchMessageInput />
      </div>
    );
}

export default WorkspaceDetailsBar;
