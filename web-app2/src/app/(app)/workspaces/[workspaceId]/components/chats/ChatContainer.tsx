import React from "react";
import ActiveParticipants from "@/app/(app)/workspaces/[workspaceId]/components/chats/ActiveParticipants";
import { getUserAuthFromJWT } from "@/utils/helper";
import MessagesContainer from "@/app/(app)/chats/components/MessagesContainer";
import SendBar from "@/app/(app)/chats/components/SendBar";
import { IWorkspace } from "@/utils/@types/workspace";

async function ChatContainer({
  workspaceId,
  participants,
}: {
  workspaceId: string;
  participants: IWorkspace["participants"];
}) {
  const payload = await getUserAuthFromJWT();

  return (
    <div className="h-[93.5%] w-full bg-red-300">
      <div className="flex flex-col w-full md:w-3/4 h-full float-left overflow-y-auto border-[1px] border-gray-150">
        <div className="flex flex-col justify-start items-start bg-white px-2 py-1">
          <p className="font-bold capitalize">chats</p>
          <p className="text-sm opacity-70 max-w-96 truncate">
            {participants
              .map((participant) => participant.user.username)
              .join(",")}
          </p>
        </div>
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
