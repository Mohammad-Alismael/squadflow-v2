"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Message from "@/app/(app)/chats2/components/Message";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { io } from "socket.io-client";
import { Socket } from "node:net";
import { PopulatedUser } from "@/utils/@types/user";
import MessageSkeleton from "@/app/(app)/chats/components/MessageSkeleton";
export type MessageType = {
  _id: string;
  text: string;
  user: PopulatedUser;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
};

function MessagesContainer({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") as string;
  const keyword = searchParams.get("messageKeyword") ?? ("" as string);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    setMessages([]);
    const URL =
      process.env.NEXT_PUBLIC_REAL_TIME_URL +
      `?workspaceId=${workspaceId}&token=${token}`;
    const newSocket = io(URL);
    // @ts-ignore
    socketRef.current = newSocket;

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onWorkspaceMessagesEvent(value: MessageType[]) {
      setMessages(value);
    }

    newSocket.on("connect", onConnect);
    newSocket.on("disconnect", onDisconnect);
    newSocket.on("workspaceMessages", onWorkspaceMessagesEvent);

    return () => {
      newSocket.off("connect", onConnect);
      newSocket.off("disconnect", onDisconnect);
      newSocket.off("workspaceMessages", onWorkspaceMessagesEvent);
      newSocket.close();
    };
  }, [workspaceId, token]);
  const endOfMessagesRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
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
  if ((workspaceId && !isConnected) || messages.length === 0)
    return (
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto flex flex-col items-start gap-2 p-4 bg-gray-200"
      >
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    );
  if (workspaceId && isConnected)
    return (
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto flex flex-col items-start gap-2 p-4 bg-gray-200"
      >
        {!!messages.length &&
          messages
            .filter((item) => item.text.includes(keyword))
            .map((item) => <Message key={item._id} data={item} />)}
      </div>
    );
}

export default MessagesContainer;
