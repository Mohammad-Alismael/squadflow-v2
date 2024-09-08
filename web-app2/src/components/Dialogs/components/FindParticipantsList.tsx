"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Participant from "@/app/(app)/workspaces/components/Participant";
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";
import { useGetCommunity } from "@/utils/hooks/community/useGetCommunity";
import FindParticipantsSkeleton from "@/components/Dialogs/components/FindParticipantsSkeleton";
import {
  filterParticipantsByKeyword,
  getParticipantRole,
  isParticipantIncluded,
} from "@/lib/helper/FindParticipantsList.helper";

function FindParticipantsList() {
  const { data, isLoading } = useGetCommunity();
  const [keyword, setKeyword] = useState("");
  const { participants } = workspaceParticipantStore((state) => state);
  const filteredParticipants = filterParticipantsByKeyword(
    data?.participants ?? [],
    keyword
  );

  if (isLoading) return <FindParticipantsSkeleton />;

  if (data)
    return (
      <div className="w-full">
        <Input
          type="text"
          placeholder="search by username..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="mt-2">
          {!filteredParticipants.length && <span>no results found</span>}
          {!!filteredParticipants.length &&
            filteredParticipants.map((participant, index) => {
              const isIncluded = isParticipantIncluded(
                participants,
                participant.user._id
              );
              const role = getParticipantRole(
                participants,
                participant.user._id
              );

              return (
                <React.Fragment key={participant._id}>
                  <Participant
                    user={participant.user}
                    showDelete={isIncluded}
                    role={role}
                  />
                  {index !== filteredParticipants.length - 1 && <hr />}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
}

export default FindParticipantsList;
