import React from "react";
import { Input } from "@/components/ui/input";
import ActiveParticipants from "@/app/(app)/workspaces/[workspaceId]/components/chats/ActiveParticipants";
import { getUserAuthFromJWT } from "@/utils/helper";
import MessagesContainer from "@/app/(app)/chats/components/MessagesContainer";
import SendBar from "@/app/(app)/chats/components/SendBar";

async function ChatContainer({ workspaceId }: { workspaceId: string }) {
  const payload = await getUserAuthFromJWT();

  return (
    <div className="h-[93.5%] w-full bg-red-300">
      <div className="flex flex-col w-4/5 h-full float-left overflow-y-auto border-2 border-gray-150">
        <MessagesContainer
          userId={payload?._id}
          workspaceIdProps={workspaceId}
          communityId={payload?.communityId}
        />
        <div>
          <SendBar
            userId={payload?._id}
            communityId={payload?.communityId}
            workspaceIdProps={workspaceId}
          />
        </div>
      </div>
      <ActiveParticipants
        userId={payload?._id}
        workspaceId={workspaceId}
        communityId={payload?.communityId}
      />
    </div>
  );
}

export default ChatContainer;
