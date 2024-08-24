"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { writeMessage } from "@/lib/firebase/firebase-real-time";
import { useRouter, useSearchParams } from "next/navigation";
import { validateUserData } from "@/app/(app)/chats/actions";

SendBar.propTypes = {};

function SendBar({
  userId,
  workspaceIdProps,
  communityId,
}: {
  userId: string | unknown;
  workspaceIdProps?: string;
  communityId: string | unknown;
}) {
  const searchParams = useSearchParams();
  const workspaceId =
    workspaceIdProps || (searchParams.get("workspaceId") as string);
  const [text, setText] = useState("");
  const handleSubmit = async () => {
    // userId && (await validateUserData(userId));
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
    <div className="bg-[#F0EEEE] p-4">
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
