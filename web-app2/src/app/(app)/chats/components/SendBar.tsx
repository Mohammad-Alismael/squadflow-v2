"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { writeMessage } from "@/lib/firebase/firebase-real-time";
import { useRouter, useSearchParams } from "next/navigation";

SendBar.propTypes = {};

function SendBar({
  userId,
  communityId,
}: {
  userId: string | unknown;
  communityId: string | unknown;
}) {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") as string;
  const [text, setText] = useState("");
  const handleSubmit = async () => {
    workspaceId &&
      (await writeMessage(
        communityId as string,
        workspaceId,
        userId as string,
        text
      ));
    setText("");
  };
  return (
    <div className="bg-gray-100">
      <div className="flex flex-row gap-2 bg-white p-2 mx-2 rounded">
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
