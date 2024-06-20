"use client";
import React from "react";
import PropTypes from "prop-types";
import { IWorkspace } from "@/utils/@types/workspace";
import { redirectWorkspaceChat } from "@/app/(app)/chats/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clsx } from "clsx";

Workspace.propTypes = {};

function Workspace({
  workspace,
  selectedWorkspaceId,
}: {
  workspace: IWorkspace;
  selectedWorkspaceId: string;
}) {
  return (
    <div
      onClick={() => redirectWorkspaceChat(workspace?._id)}
      key={workspace._id}
      className={clsx(
        "rounded-md p-4 space-y-1 bg-white",
        selectedWorkspaceId === workspace._id
          ? "border-2 border-green-800"
          : "border-2 border-gray-100"
      )}
    >
      <p>{workspace.title}</p>
      <div className="flex flex-row">
        {workspace.participants.map((participant) => (
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>{participant.user.username}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}

export default Workspace;
