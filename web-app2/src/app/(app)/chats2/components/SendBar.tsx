"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { writeMessage } from "@/lib/firebase/firebase-real-time";
import { useRouter, useSearchParams } from "next/navigation";
import { Socket } from "node:net";
import { io } from "socket.io-client";

SendBar.propTypes = {};

function SendBar({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") as string;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const URL =
      process.env.NEXT_PUBLIC_REAL_TIME_URL +
      `?workspaceId=${workspaceId}&token=${token}`;
    const newSocket = io(URL);
    socketRef.current = newSocket;
  }, [workspaceId, token]);

  const [text, setText] = useState("");
  const handleSubmit = async () => {
    socketRef.current.emit("sendMessage", text);
    setText("");
  };
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex flex-row gap-2 bg-white p-2 rounded">
        <Input
          type="text"
          name="message"
          placeholder="write anything"
          value={text}
          className="border-0"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSubmit} className="bg-green-800">
          submit
        </Button>
      </div>
    </div>
  );
}

export default SendBar;
