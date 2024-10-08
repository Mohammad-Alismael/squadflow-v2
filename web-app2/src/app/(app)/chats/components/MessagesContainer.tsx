"use client";
import React, { useEffect, useRef, useState } from "react";
import { child, getDatabase, onValue, ref } from "firebase/database";

import Message from "@/app/(app)/chats/components/Message";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { addUserDataToMessages } from "@/app/(app)/chats/actions";
import MessageSkeleton from "@/app/(app)/chats/components/MessageSkeleton";
export type MessageType = {
  messageId: string;
  created_by: string;
  created_at: number;
  text: string;
  timestamp: string;
};
export type MessageTypeWithUserData = MessageType & {
  user: {
    username: string;
    email: string;
    photoURL: string;
  };
};

function extractMessagesFromConversations(conversations: { [x: string]: any }) {
  const mIds = Object.keys(conversations);
  const list: any[] | ((prevState: MessageType[]) => MessageType[]) = [];
  mIds.forEach((id) => {
    list.push({ messageId: id, ...conversations[id] });
  });
  return list;
}

function MessagesContainer({
  communityId,
  workspaceIdProps,
  userId,
}: {
  userId: string | unknown;
  workspaceIdProps?: string;
  communityId: string | unknown;
}) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const workspaceId =
    workspaceIdProps || (searchParams.get("workspaceId") as string);
  const keyword = searchParams.get("messageKeyword") ?? ("" as string);
  const [data, setData] = useState<MessageTypeWithUserData[]>([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const convRef = child(dbRef, `communities/${communityId}/${workspaceId}`);

    // Set loading state at the beginning
    setData([]);
    setIsLoading(true);

    const addUserDataAndSetMessages = async (items: MessageType[]) => {
      try {
        const res = await addUserDataToMessages(items);
        setData(res);
      } catch (error) {
        console.error("Error adding user data to messages:", error);
      }
    };

    const unsubscribe = onValue(
      convRef,
      async (snapshot) => {
        try {
          if (snapshot.exists()) {
            const conversations = snapshot.val();
            const list = extractMessagesFromConversations(conversations);

            await addUserDataAndSetMessages(list);
          }
        } catch (error) {
          console.error("Error processing snapshot:", error);
        } finally {
          // Always set loading to false after processing
          setIsLoading(false);
        }
      },
      (error) => {
        // Log the error and set loading to false if an error occurs in the listener
        console.error("Firebase onValue error:", error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe(); // Clean up the Firebase listener when the component unmounts
    };
  }, [workspaceId, communityId]);

  const endOfMessagesRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);
  if (workspaceId && isLoading)
    return (
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto flex flex-col items-start gap-2 p-4 bg-[#F0EEEE]"
      >
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    );

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
        className="flex-1 w-full overflow-y-auto flex flex-col items-start gap-2 p-4 bg-[#F0EEEE]"
      >
        {!data.length && <p>no messages</p>}
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
