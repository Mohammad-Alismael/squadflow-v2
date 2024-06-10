"use client";
import React, { useEffect, useState } from "react";
import { child, getDatabase, onValue, ref } from "firebase/database";

import Message from "@/app/(app)/chats/components/Message";
import { useSearchParams } from "next/navigation";
export type MessageType = {
  messageId: string;
  created_at: number;
  text: string;
  timestamp: string;
};
function MessagesContainer({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") as string;
  const [data, setData] = useState<MessageType[]>([]);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    const convRef = child(dbRef, `communities/${communityId}/${workspaceId}`);
    setData([]);
    return onValue(
      convRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const conversations = snapshot.val();
          const mIds = Object.keys(conversations);
          const list = [];
          console.log(workspaceId, mIds);
          mIds.forEach((id) => {
            list.push({ messageId: id, ...conversations[id] });
          });
          setData(list);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, [workspaceId]);
  if (!workspaceId) return <div>select workspace to read messages</div>;
  if (workspaceId)
    return (
      <div className="h-[80%] w-full overflow-y-auto flex flex-col items-start gap-2 py-4">
        {!data.length && <p>no messages</p>}
        {!!data.length &&
          data.map((item) => (
            <Message key={item.messageId} data={item} currentUserId={userId} />
          ))}
      </div>
    );
}

export default MessagesContainer;
