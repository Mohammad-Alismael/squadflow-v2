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

  if (loadColumn)
    return LoadingCreateTaskDialog(
      searchParams["columnId"],
      params.workspaceId
    );
  return (
    <div className="h-full flex flex-col">
      <WorkspaceNavbar workspaceId={params.workspaceId} />
      <Tabs defaultValue={currentTab} className="w-full h-[90vh]">
        <div className="flex flex-col mb-3 md:flex-row justify-between items-start md:items-center">
          <WorkspaceTabs workspaceId={params.workspaceId} />
          {searchParams && (
            <div>
              {loadKanban && (
                <WorkspaceHeader
                  className=""
                  workspaceId={params.workspaceId}
                />
              )}
            </div>
          )}
        </div>
        {loadKanban && (
          <div className="space-y-2.5">
            <Suspense key="kanban" fallback={<p>loading kanban ...</p>}>
              <ColumnsWrapperServer workspaceId={params.workspaceId} />
            </Suspense>
          </div>
        )}
        {loadChats && <ChatContainer workspaceId={params.workspaceId} />}
        {loadCalendar && (
          <Suspense key="calendar" fallback={<p>loading calendar ...</p>}>
            <CalendarWrapper workspaceId={params.workspaceId} />
          </Suspense>
        )}
      </Tabs>
    </div>
  );
}

async function LoadingCreateTaskDialog(columnId: string, workspaceId: string) {
  let data = await fetchWorkspace(workspaceId);
  const canDialogBeOpened =
    data?.columns && checkColumnId(data.columns, columnId);
  if (canDialogBeOpened)
    return (
      <CreateTaskDialog
        key={columnId}
        columnId={columnId}
        workspaceId={workspaceId}
      />
    );
}

export default Page;
