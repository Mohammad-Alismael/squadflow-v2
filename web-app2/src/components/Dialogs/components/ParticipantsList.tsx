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
  console.log({ joinedParticipants });
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
      {/*{joinedParticipants.slice(0, 5).map((participant) => (*/}
      {/*    <Avatar key={participant.user} className="w-7 h-7">*/}
      {/*        <AvatarImage src={participant.user.photoURL} />*/}
      {/*        <AvatarFallback>{participant.user.username}</AvatarFallback>*/}
      {/*    </Avatar>*/}
      {/*))}*/}
      {/*{joinedParticipants.length > 5 && (*/}
      {/*    <div className="w-7 h-7 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full p-0.5">*/}
      {/*        +{joinedParticipants.length - 5}*/}
      {/*    </div>*/}
      {/*)}*/}
      <FindParticipantsDialog>
        <div className="bg-gray-200 rounded-full p-2">
          <PlusIcon className="h-6 w-6" />
        </div>
      </FindParticipantsDialog>
    </div>
  );
}

export default ParticipantsList;
