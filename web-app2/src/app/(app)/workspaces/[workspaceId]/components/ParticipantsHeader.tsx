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
        data?.participants
          .slice(0, 5)
          .map((item: WorkspaceParticipants, index) => (
            <Avatar key={`${item._id}-${index}`} className="w-8 h-8">
              <AvatarImage src={item.user.photoURL} />
              <AvatarFallback>{item.user.username}</AvatarFallback>
            </Avatar>
          ))}
      {data && data?.participants.length > 5 && (
        <div className="w-7 h-7 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full p-0.5">
          +{data.participants.length - 5}
        </div>
      )}
    </div>
  );
}

export default ParticipantsHeader;
