import React, { Suspense } from "react";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import WorkspaceHeader from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceHeader";
import ColumnsWrapperServer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsWrapperServer";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import { IWorkspace } from "@/utils/@types/workspace";
import {
  fetchWorkspace,
  getTasksForWorkspace,
  getWorkspacePrivilege,
} from "@/utils/actions/workspace-actions";
import { Tabs } from "@/components/ui/tabs";
import WorkspaceTabs from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceTabs";
import ChatContainer from "@/app/(app)/workspaces/[workspaceId]/components/chats/ChatContainer";
import CalendarWrapper from "@/app/(app)/calendars/components/CalendarWrapper";
import { MetaTaskResponse, TaskResponse } from "@/utils/@types/task";
import NavbarSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/NavbarSkeleton";
import ColumnHeaderSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeaderSkeleton";
import ColumnsContainerSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/ColumnsContainerSkeleton";

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  let currentTab = (searchParams && searchParams["tabs"]) ?? "kanban";
  if (
    currentTab !== "kanban" &&
    currentTab !== "chats" &&
    currentTab !== "calendar"
  ) {
    currentTab = "kanban";
  }

  const data_ = fetchWorkspace(params.workspaceId);
  const role_ = getWorkspacePrivilege(params.workspaceId);

  console.time("PromiseAllTime");

  const [data, role] = (await Promise.all([data_, role_])) as [
    IWorkspace,
    string
  ];

  console.timeEnd("PromiseAllTime");

  return (
    <div className="h-full flex flex-col">
      <WorkspaceNavbar
        title={data?.title ?? ""}
        workspaceId={params.workspaceId}
      />
      <Tabs defaultValue={currentTab} className="w-full h-[90vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <WorkspaceTabs workspaceId={params.workspaceId} />
          {searchParams && (
            <div>
              {currentTab === "kanban" && (
                <WorkspaceHeader
                  className=""
                  role={role}
                  workspaceId={params.workspaceId}
                />
              )}
              {/*{searchParams["tabs"] === "chats" && (*/}
              {/*  <div className="">*/}
              {/*    <SearchMessageInput />*/}
              {/*  </div>*/}
              {/*)}*/}
              {/*{searchParams["tabs"] === "calendar" && <p>calendar</p>}*/}
            </div>
          )}
        </div>
        {currentTab === "kanban" && (
          <div className="space-y-2.5">
            <Suspense fallback={<p>loading kanban ...</p>}>
              <ColumnsWrapperServer
                columns={data?.columns ?? []}
                workspaceId={params.workspaceId}
              />
            </Suspense>
          </div>
        )}
        {currentTab === "chats" && (
          <ChatContainer
            workspaceId={params.workspaceId}
            participants={data.participants}
          />
        )}
        {currentTab === "calendar" && (
          <Suspense fallback={<p>loading calendar ...</p>}>
            <CalendarWrapper workspaceId={params.workspaceId} />
          </Suspense>
        )}
      </Tabs>

      {searchParams && searchParams["columnId"] && (
        <CreateTaskDialog
          key={searchParams["columnId"]}
          columnId={searchParams["columnId"]}
          role={role}
          workspaceId={params.workspaceId}
        />
      )}
    </div>
  );
}

export default Page;
