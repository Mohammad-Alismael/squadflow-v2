import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IWorkspace, WorkspaceParticipants } from "@/utils/@types/workspace";
import { getWorkspaceByIdPopulated } from "@/lib/workspace";
import { ObjectId } from "mongodb";

async function ParticipantsHeader({ workspaceId }: { workspaceId: string }) {
  const data = await getWorkspaceByIdPopulated(new ObjectId(workspaceId));

  return (
    <div className="flex items-center">
      {data &&
        data?.participants.map((participant: WorkspaceParticipants) => (
          <Avatar key={participant._id.toString()} className="w-8 h-8">
            <AvatarImage src={participant.user.photoURL} />
            <AvatarFallback>{participant.user.username}</AvatarFallback>
          </Avatar>
        ))}
    </div>
  );
}

export default ParticipantsHeader;
