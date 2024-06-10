import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleWriteMessage } from "@/app/(app)/chats/actions";
import SendBar from "@/app/(app)/chats/components/SendBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import MessagesContainer from "@/app/(app)/chats/components/MessagesContainer";
import Message from "@/app/(app)/chats/components/Message";
import WorkspacesList from "@/app/(app)/chats/components/WorkspacesList";
import WorkspaceDetailsBar from "@/app/(app)/chats/components/workspaceDetailsBar";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const { payload } = await verifyJWTToken(cookie?.value);
  return (
    <div className="h-full flex flex-col">
      <Navbar>
        <div>
          <p className="text-2xl">Chats</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="flex-grow h-[89.9%]">
        <Suspense fallback={<p>loading ...</p>}>
          <WorkspacesList selectedWorkspaceId={searchParams["workspaceId"]} />
        </Suspense>
        <div className="h-full w-3/4 float-right px-4">
          <Suspense fallback={<p>loading ...</p>}>
            <WorkspaceDetailsBar workspaceId={searchParams["workspaceId"]} />
          </Suspense>
          <MessagesContainer
            userId={payload?._id}
            communityId={payload?.communityId}
          />
          <SendBar userId={payload?._id} communityId={payload?.communityId} />
        </div>
      </div>
    </div>
  );
}

export default Page;
