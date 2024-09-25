"use client";
import React from "react";
import PropTypes from "prop-types";
import { IWorkspace } from "@/utils/@types/workspace";
import { redirectWorkspaceChat } from "@/app/(app)/chats/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clsx } from "clsx";
import Link from "next/link";

Workspace.propTypes = {};

function Workspace({
  workspace,
  selectedWorkspaceId,
}: {
  workspace: IWorkspace;
  selectedWorkspaceId: string;
}) {
  return (
    <Link
      href={`/chats2?workspaceId=${workspace?._id}`}
      prefetch={false}
      scroll={false}
    >
      <div
        key={workspace._id}
        className={clsx(
          "rounded-md p-4 md:p-5 space-y-1 bg-white",
          selectedWorkspaceId === workspace._id
            ? "border-2 border-green-800"
            : "border-2 border-gray-100"
        )}
      >
        <p className="min-w-32 truncate text-sm md:text-base lg:text-lg">
          {workspace.title}
        </p>
        <div className="flex flex-row flex-wrap">
          {workspace.participants.map((participant) => (
            <Avatar
              key={participant.user.username}
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>{participant.user.username}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Workspace;
