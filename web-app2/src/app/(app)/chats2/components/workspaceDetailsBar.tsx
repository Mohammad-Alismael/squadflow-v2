import React from "react";
import { getWorkspaceByIdPopulated } from "@/lib/workspace";
import SearchMessageInput from "@/app/(app)/chats/components/SearchMessageInput";
import { ObjectId } from "mongodb";
import NavigateBack from "@/app/(app)/chats/components/NavigateBack";
import { IWorkspace } from "@/utils/@types/workspace";

async function WorkspaceDetailsBar({ workspaceId }: { workspaceId: string }) {
  const workspace =
    workspaceId &&
    ((await getWorkspaceByIdPopulated(
      new ObjectId(workspaceId)
    )) as IWorkspace);

  if (workspace)
    return (
      <div className="flex gap-2 justify-between items-center bg-white px-4 py-2 rounded-t">
        <NavigateBack />
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
