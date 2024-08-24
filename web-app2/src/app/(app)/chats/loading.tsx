import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import WorkspacesListSkeleton from "@/app/(app)/chats/components/WorkspacesListSkeleton";
import SendBarSkeleton from "@/app/(app)/chats/components/SendBarSkeleton";
import MessageSkeleton from "@/app/(app)/chats/components/MessageSkeleton";

Loading.propTypes = {};

function Loading() {
  return (
    <div className="h-full flex flex-col">
      <Navbar>
        <div>
          <p className="text-2xl">Chats</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="flex flex-row w-full h-full">
        <div className="hidden md:flex flex-col w-1/4 float-left">
          <WorkspacesListSkeleton />
        </div>
        <div className="bg-gray-200 h-full w-full md:w-3/4 float-right flex flex-col">
          <div className="flex-1 w-full overflow-y-auto flex flex-col items-start gap-2 p-4bg-[#F0EEEE]">
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </div>
          <SendBarSkeleton />
        </div>
      </div>
    </div>
  );
}

export default Loading;
