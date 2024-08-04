import React, { Suspense } from "react";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import WorkspaceHeader from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceHeader";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import ColumnsWrapperServer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsWrapperServer";
import ColumnsContainerSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/ColumnsContainerSkeleton";
import NavbarSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/NavbarSkeleton";
import TaskDetailsDialogServer from "@/components/Dialogs/TaskDetailsDialogServer";
import TaskDetailsDialogSkeleton from "@/components/Dialogs/TaskDetailsDialogSkeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  console.log("[workspaceId]/", params, searchParams);
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <div className="space-y-2.5">
        <Suspense fallback={<p>loading..</p>}>
          <WorkspaceHeader className="" workspaceId={params.workspaceId} />
        </Suspense>
        <Suspense fallback={<ColumnsContainerSkeleton />}>
          <ColumnsWrapperServer workspaceId={params.workspaceId} />
        </Suspense>
      </div>

      {/*<TaskDetailsDialog*/}
      {/*  workspaceId={params.workspaceId}*/}
      {/*  revertBackTo={`/workspaces/${params.workspaceId}`}*/}
      {/*/>*/}
      <Suspense
        fallback={
          <Dialog>
            <DialogContent className="hidden md:block p-0 w-4/5 h-[80%]">
              <TaskDetailsDialogSkeleton />
            </DialogContent>
          </Dialog>
        }
      >
        {searchParams && (
          <TaskDetailsDialogServer
            taskId={searchParams["taskId"]}
            workspaceId={params.workspaceId}
            revertBackTo={`/workspaces/${params.workspaceId}`}
          />
        )}
      </Suspense>
    </div>
  );
}

export default Page;
