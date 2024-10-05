import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FindParticipantsDialog from "@/components/Dialogs/FindParticipantsDialog";
import { PlusIcon } from "lucide-react";
import { Participant } from "@/utils/store/workspaceParticipantStore";

function ParticipantsList({
  joinedParticipants,
}: {
  joinedParticipants: Participant[];
}) {
  return (
    <div className="mt-4 flex items-center gap-2">
      {joinedParticipants.slice(0, 5).map((participant) => (
        <Avatar key={participant.user} className="w-9 h-9">
          <AvatarImage src={participant.user} />
          <AvatarFallback>{participant.user}</AvatarFallback>
        </Avatar>
      ))}
      {joinedParticipants.length > 5 && (
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full p-0.5">
          +{joinedParticipants.length - 5}
        </div>
      )}
      <FindParticipantsDialog>
        <div className="bg-gray-200 rounded-full p-1">
          <PlusIcon className="h-7 w-7" />
        </div>
      </FindParticipantsDialog>
    </div>
  );
}

export default ParticipantsList;
