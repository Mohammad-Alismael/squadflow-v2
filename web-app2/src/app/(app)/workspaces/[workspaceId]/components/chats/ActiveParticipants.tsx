"use client";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  getActiveUser,
  joinLiveChat,
  leaveLiveChat,
} from "@/lib/firebase/firebase-real-time";
import { getActiveUserData } from "@/app/(app)/chats/actions";
import Participant from "@/app/(app)/workspaces/[workspaceId]/components/chats/Participant";

export type Active = {
  timestamp: string;
  userId: string;
  user: {
    username: string;
    email: string;
    photoURL: string;
  };
};

function ActiveParticipants({
  userId,
  workspaceId,
  communityId,
}: {
  userId: string;
  workspaceId: string;
  communityId: string;
}) {
  const [data, setData] = useState<Active[]>([]);
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    let cleanUpListener: () => void;
    const initializeChat = async () => {
      await joinLiveChat(communityId, workspaceId, userId);

      cleanUpListener = getActiveUser(
        communityId,
        workspaceId,
        async (data) => {
          const activeUserData = await getActiveUserData(data);
          setData(activeUserData);
        }
      );
    };

    initializeChat();
    console.log("connected");

    return () => {
      cleanUpListener();
      leaveLiveChat(communityId, workspaceId, userId)
        .then(() => console.log("disconnected"))
        .catch((error) => console.error("Error leaving live chat:", error));
    };
  }, [communityId, workspaceId, userId]);
  return (
    <div className="p-1 float-right w-1/5 h-full bg-[#EEEFFC]">
      <h4 className="capitalize font-bold py-2 px-1 text-2xl">
        active participants
      </h4>
      <div className="space-y-2 px-4">
        {!!data.length &&
          data.map(({ user }, index) => {
            return (
              <>
                <Participant key={user.username} data={user} />
                {index !== (data?.length ?? 0) - 1 && <hr />}
              </>
            );
          })}
      </div>
    </div>
  );
}

export default ActiveParticipants;
