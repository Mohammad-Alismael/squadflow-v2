"use client";
import React, { useEffect, useRef, useState } from "react";
import { child, getDatabase, onValue, ref } from "firebase/database";

import Message from "@/app/(app)/chats/components/Message";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
export type MessageType = {
  messageId: string;
  created_by: string;
  created_at: number;
  text: string;
  timestamp: string;
};

function extracted(conversations: { [x: string]: any }) {
  const mIds = Object.keys(conversations);
  const list: any[] | ((prevState: MessageType[]) => MessageType[]) = [];
  mIds.forEach((id) => {
    list.push({ messageId: id, ...conversations[id] });
  });
  return list;
}

function MessagesContainer({
  communityId,
  userId,
}: {
  userId: string | unknown;
  communityId: string | unknown;
}) {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") as string;
  const keyword = searchParams.get("messageKeyword") ?? ("" as string);
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
          const list = extracted(conversations);
          setData(list);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, [workspaceId, communityId]);
  const endOfMessagesRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);
  if (!workspaceId)
    return (
      <div className="hidden flex-1 md:flex flex-col items-center justify-centers">
        <Image
          src="./Team-goals-bro.svg"
          width={500}
          height={300}
          alt="no workspaces"
        />
        <div className="flex flex-col items-center justify-center">
          <h3 className="capitalize text-xl font-bold">
            select workspace to read messages
          </h3>
          <h3 className="capitalize opacity-50">
            try to create select workspaces or create new/join workspace(s)
          </h3>
        </div>
      </div>
    );
  if (workspaceId)
    return (
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto flex flex-col items-start gap-2 p-4 bg-gray-200"
      >
        {!data.length && <p>no messages</p>}
        {/*<p>{JSON.stringify(data)}</p>*/}
        {!!data.length &&
          data
            .filter((item) => item.text.includes(keyword))
            .map((item) => (
              <Message
                key={item.messageId}
                data={item}
                currentUserId={userId as string}
              />
            ))}
      </div>
    );
}

export default MessagesContainer;
