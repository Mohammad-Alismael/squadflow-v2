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

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <div className="space-y-2.5">
        <Suspense fallback={<ColumnHeaderSkeleton />}>
          <WorkspaceHeader className="" workspaceId={params.workspaceId} />
        </Suspense>
        <Suspense fallback={<ColumnsContainerSkeleton />}>
          <ColumnsWrapperServer workspaceId={params.workspaceId} />
        </Suspense>
      </div>

      {searchParams && searchParams["columnId"] && (
        <CreateTaskDialog
          key={searchParams["columnId"]}
          columnId={searchParams["columnId"]}
          workspaceId={params.workspaceId}
        />
      )}
    </div>
  );
}

export default Page;
