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
      {joinedParticipants.map((item) => {
        return (
          <Avatar key={item.user}>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>{item.user}</AvatarFallback>
          </Avatar>
        );
      })}
      <FindParticipantsDialog>
        <div className="bg-gray-200 rounded-full p-2">
          <PlusIcon className="h-6 w-6" />
        </div>
      </FindParticipantsDialog>
    </div>
  );
}

export default ParticipantsList;
