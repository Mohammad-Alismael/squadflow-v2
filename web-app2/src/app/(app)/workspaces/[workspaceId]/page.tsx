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
import { MetaTaskResponse } from "@/utils/@types/task";
import { WORKSPACE_TABS } from "@/utils/helper-client";
import { checkColumnId } from "@/app/(app)/workspaces/[workspaceId]/helper";

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  let currentTab =
    (searchParams && searchParams["tabs"]) ?? WORKSPACE_TABS.KANBAN;
  if (
    currentTab !== WORKSPACE_TABS.KANBAN &&
    currentTab !== WORKSPACE_TABS.CHATS &&
    currentTab !== WORKSPACE_TABS.CALENDAR
  ) {
    currentTab = WORKSPACE_TABS.KANBAN;
  }
  const loadKanban = currentTab == WORKSPACE_TABS.KANBAN;
  const loadColumn = searchParams && searchParams["columnId"];
  const loadChats = currentTab === WORKSPACE_TABS.CHATS;
  const loadCalendar = currentTab === WORKSPACE_TABS.CALENDAR;

  let data_ = fetchWorkspace(params.workspaceId);
  let tasks_: Promise<MetaTaskResponse[]> = Promise.resolve([]);

  // Only assign the tasks_ promise if `loadKanban` and `!loadColumn` are true
  if (loadKanban && !loadColumn) {
    tasks_ = getTasksForWorkspace(params.workspaceId);
  }

  console.time("PromiseAllTime");

  const [data, tasks] = (await Promise.all([
    data_, // Fetch workspace data
    tasks_, // Conditionally fetch tasks
  ])) as [IWorkspace, MetaTaskResponse[]];

  console.timeEnd("PromiseAllTime");
  const loadColumnDialog =
    loadColumn && data?.columns && checkColumnId(data.columns, loadColumn);

  if (loadColumnDialog)
    return (
      <CreateTaskDialog
        key={searchParams["columnId"]}
        columnId={searchParams["columnId"]}
        workspaceId={params.workspaceId}
      />
    );
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
              {currentTab === WORKSPACE_TABS.KANBAN && (
                <WorkspaceHeader
                  className=""
                  workspaceId={params.workspaceId}
                />
              )}
            </div>
          )}
        </div>
        {currentTab === WORKSPACE_TABS.KANBAN && tasks && (
          <div className="space-y-2.5">
            <ColumnsWrapperServer
              columns={data?.columns ?? []}
              tasks={tasks}
              workspaceId={params.workspaceId}
            />
          </div>
        )}
        {currentTab === WORKSPACE_TABS.CHATS && (
          <ChatContainer
            workspaceId={params.workspaceId}
            participants={data.participants}
          />
        )}
        {currentTab === WORKSPACE_TABS.CALENDAR && (
          <Suspense fallback={<p>loading calendar ...</p>}>
            <CalendarWrapper workspaceId={params.workspaceId} />
          </Suspense>
        )}
      </Tabs>
    </div>
  );
}

export default Page;
