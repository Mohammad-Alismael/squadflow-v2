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
    <div className="flex flex-row w-full gap-2">
      <Input
        type="text"
        name="message"
        placeholder="write anything"
        value={text}
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
  );
}

export default SendBar;
