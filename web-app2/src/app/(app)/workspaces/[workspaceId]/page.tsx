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
      <div className="space-y-2.5">
        <WorkspaceHeader
          className=""
          role={role}
          workspaceId={params.workspaceId}
        />
        <ColumnsWrapperServer
          tasks={tasks}
          columns={data?.columns ?? []}
          workspaceId={params.workspaceId}
        />
      </div>

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
