"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Participant from "@/app/(app)/workspaces/components/Participant";
import { CommunityResponse } from "@/utils/@types/community";
import { fetchCommunity } from "@/app/(app)/settings/requests";
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";

function ParticipantsList() {
  const [data, setData] = useState<CommunityResponse>(null);
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const state = workspaceParticipantStore((state) => state);
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchCommunity();
      if (res.status === 200) setData(res.data);
    };
    setLoading(true);
    fetch();
    setLoading(false);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (data)
    return (
      <div className="">
        <Input
          type="text"
          placeholder="search by username..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="mt-2">
          {data.participants
            .filter((participant) =>
              participant.user.username.includes(keyword)
            )
            .map((participant, index) => {
              return (
                <>
                  <Participant
                    key={participant._id}
                    user={participant.user}
                    showDelete={state.participants
                      .map((item) => item.user)
                      .includes(participant.user._id)}
                  />
                  {index !== data.participants.length - 1 && <hr />}
                </>
              );
            })}
        </div>
      </div>
    );
}

export default ParticipantsList;
