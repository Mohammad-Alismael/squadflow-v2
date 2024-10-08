"use client";
import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommunityResponse } from "@/utils/@types/community";
function DisplayParticipants({
  participants,
}: {
  participants: CommunityResponse["participants"];
}) {
  return (
    <React.Fragment>
      {participants
        .slice(0, 7)
        .map((participant: CommunityResponse["participants"][0]) => (
          <Avatar className="h-12 w-12" key={participant._id}>
            <AvatarImage src={participant.user.photoURL} />
            <AvatarFallback>
              {participant.user.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        ))}
    </React.Fragment>
  );
}

export default DisplayParticipants;
