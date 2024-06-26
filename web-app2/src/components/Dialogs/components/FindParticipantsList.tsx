"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Participant from "@/app/(app)/workspaces/components/Participant";
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";
import { useGetCommunity } from "@/utils/hooks/community/useGetCommunity";

function FindParticipantsList() {
  const { data, isLoading } = useGetCommunity();
  const [keyword, setKeyword] = useState("");
  const { participants } = workspaceParticipantStore((state) => state);

  if (isLoading) return <p>Loading...</p>;
  if (data?.data)
    return (
      <div className="">
        <Input
          type="text"
          placeholder="search by username..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="mt-2">
          {data.data.participants
            .filter((participant) =>
              participant.user.username.includes(keyword)
            )
            .map((participant, index) => {
              const isIncluded = participants
                .map((item) => item.user)
                .includes(participant.user._id);
              const userFound = participants.find(
                (item) => item.user === participant.user._id
              );
              return (
                <>
                  <Participant
                    key={participant._id}
                    user={participant.user}
                    showDelete={isIncluded}
                    role={userFound ? userFound.role : ""}
                  />
                  {index !== data?.data.participants.length - 1 && <hr />}
                </>
              );
            })}
        </div>
      </div>
    );
}

export default FindParticipantsList;
