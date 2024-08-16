import React, { Suspense } from "react";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import WorkspaceHeader from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceHeader";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import ColumnsWrapperServer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsWrapperServer";
import ColumnsContainerSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/ColumnsContainerSkeleton";
import NavbarSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/NavbarSkeleton";
import TaskDetailsDialogServer from "@/components/Dialogs/TaskDetailsDialogServer";
import TaskDetailsDialogSkeleton from "@/components/Dialogs/TaskDetailsDialogSkeleton";
import ColumnHeaderSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeaderSkeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import { IWorkspace } from "@/utils/@types/workspace";
import {
  fetchWorkspace,
  getTasksForWorkspace,
  getWorkspacePrivilege,
} from "@/utils/actions/workspace-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkspaceTabs from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceTabs";

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

  const [data, role, tasks] = (await Promise.all([data_, role_, tasks_])) as [
    IWorkspace,
    string,
    any
  ];

  return (
    <div className="h-full flex flex-col">
      <WorkspaceNavbar
        title={data?.title ?? ""}
        workspaceId={params.workspaceId}
      />
      <Tabs defaultValue="kanban" className="w-full">
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
              {searchParams["tabs"] === "chats" && <p>chats</p>}
              {searchParams["tabs"] === "calendar" && <p>calendar</p>}
            </div>
          )}
        </div>
        <TabsContent value="kanban">
          <div className="space-y-2.5">
            <ColumnsWrapperServer
              tasks={tasks}
              columns={data?.columns ?? []}
              workspaceId={params.workspaceId}
            />
          </div>
        </TabsContent>
        <TabsContent
          value="chats"
          className="w-full h-full flex flex-col bg-green-600"
        >
          <div className="bg-red-400 flex-1">
            <p>hello how are you ?</p>
          </div>
          <div>
            <Input placeholder="send a text" />
          </div>
        </TabsContent>
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
