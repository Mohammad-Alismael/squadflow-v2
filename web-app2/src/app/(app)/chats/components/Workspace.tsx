"use client";
import React from "react";
import PropTypes from "prop-types";
import { IWorkspace } from "@/utils/@types/workspace";
import { redirectWorkspaceChat } from "@/app/(app)/chats/actions";

Workspace.propTypes = {};

function Workspace({ workspace }: { workspace: IWorkspace }) {
  return (
    <div
      onClick={() => redirectWorkspaceChat(workspace._id)}
      key={workspace._id}
      className="bg-white rounded-md p-4"
    >
      <p>{workspace.title}</p>
    </div>
  );
}

export default Workspace;
