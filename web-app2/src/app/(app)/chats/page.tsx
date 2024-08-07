import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import SendBar from "@/app/(app)/chats/components/SendBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";
const MessagesContainer = dynamic(
  () => import("@/app/(app)/chats/components/MessagesContainer"),
  {
    ssr: false,
  }
);
// import MessagesContainer from "@/app/(app)/chats/components/MessagesContainer";
import WorkspacesList from "@/app/(app)/chats/components/WorkspacesList";
import WorkspaceDetailsBar from "@/app/(app)/chats/components/workspaceDetailsBar";
import WorkspacesListSkeleton from "@/app/(app)/chats/components/WorkspacesListSkeleton";
import dynamic from "next/dynamic";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const payload = await verifyJWTToken(cookie?.value);

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
          <Suspense fallback={<WorkspacesListSkeleton />}>
            <WorkspacesList selectedWorkspaceId={searchParams["workspaceId"]} />
          </Suspense>
        </div>
        <div className="h-full w-full md:w-3/4 float-right flex flex-col">
          <Suspense fallback={<WorkspacesListSkeleton />}>
            <WorkspaceDetailsBar workspaceId={searchParams["workspaceId"]} />
          </Suspense>
          {(!searchParams["workspaceId"] ||
            searchParams["workspaceId"] === "") && (
            <div className="flex md:hidden flex-col w-full float-left">
              {/*for mobile view*/}
              <Suspense fallback={<WorkspacesListSkeleton />}>
                <WorkspacesList
                  selectedWorkspaceId={searchParams["workspaceId"]}
                />
              </Suspense>
              {/*ends here*/}
            </div>
          )}
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
