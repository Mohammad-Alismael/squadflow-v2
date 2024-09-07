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
import { TaskResponse } from "@/utils/@types/task";

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  const data_ = fetchWorkspace(params.workspaceId);
  const role_ = getWorkspacePrivilege(params.workspaceId);
  const tasks_ = getTasksForWorkspace(params.workspaceId);

  console.time("PromiseAllTime");

  const [data, role, tasks] = (await Promise.all([data_, role_, tasks_])) as [
    IWorkspace,
    string,
    TaskResponse[]
  ];

  console.timeEnd("PromiseAllTime");

  return (
    <div className="h-full flex flex-col">
      <WorkspaceNavbar
        title={data?.title ?? ""}
        workspaceId={params.workspaceId}
      />
      <Tabs
        defaultValue={(searchParams && searchParams["tabs"]) ?? "kanban"}
        className="w-full h-[90vh]"
      >
        <div className="flex flex-row justify-between items-center">
          <WorkspaceTabs workspaceId={params.workspaceId} />
          {searchParams && (
            <div>
              {searchParams["tabs"] === "kanban" && (
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
        {searchParams && searchParams["tabs"] === "kanban" && (
          <div className="space-y-2.5">
            <ColumnsWrapperServer
              tasks={tasks}
              columns={data?.columns ?? []}
              workspaceId={params.workspaceId}
            />
          </div>
        )}
        {searchParams && searchParams["tabs"] === "chats" && (
          <ChatContainer
            workspaceId={params.workspaceId}
            participants={data.participants}
          />
        )}
        {searchParams && searchParams["tabs"] === "calendar" && (
          <CalendarWrapper workspaceId={params.workspaceId} />
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
