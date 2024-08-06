import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import WorkspacesListSkeleton from "@/app/(app)/chats/components/WorkspacesListSkeleton";
import WorkspacesList from "@/app/(app)/chats/components/WorkspacesList";
import WorkspaceDetailsBar from "@/app/(app)/chats/components/workspaceDetailsBar";
import MessagesContainer from "@/app/(app)/chats/components/MessagesContainer";
import SendBar from "@/app/(app)/chats/components/SendBar";
import SendBarSkeleton from "@/app/(app)/chats/components/SendBarSkeleton";
import MessageSkeleton from "@/app/(app)/chats/components/MessageSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex flex-row gap-x-0 flex-grow h-[89%]">
        <div className="hidden md:flex flex-col w-1/4 float-left">
          <WorkspacesListSkeleton />
        </div>
      </div>
      <div className="h-full w-full md:w-3/4 float-right flex flex-col">
        <WorkspacesListSkeleton />
        <div>
          <div className="hidden flex-1 md:flex flex-col items-center justify-center">
            <Skeleton className="w-[500px] h-[300px]" />
            <div className="flex flex-col items-center justify-center mt-4">
              <Skeleton className="w-3/4 h-8 mb-2" />
              <Skeleton className="w-2/3 h-6 opacity-50" />
            </div>
          </div>
        </div>
        <SendBarSkeleton />
      </div>
    </div>
  );
}

export default Loading;
