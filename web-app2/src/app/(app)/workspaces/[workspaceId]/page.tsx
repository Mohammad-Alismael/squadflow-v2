import React, { Suspense } from "react";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import Header from "@/app/(app)/workspaces/[workspaceId]/components/Header";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
const ColumnsContainer = dynamic(
  () =>
    import("@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer"),
  {
    ssr: false,
  }
);
import dynamic from "next/dynamic";
import {
  getTasksForWorkspace,
  fetchWorkspace,
} from "@/utils/actions/workspace-actions";
import ColumnsWrapperServer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsWrapperServer";
import ColumnsContainerSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/ColumnsContainerSkeleton";
import NavbarSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/NavbarSkeleton";

async function Page({ params }: { params: { workspaceId: string } }) {
  const workspace = await fetchWorkspace(params.workspaceId);
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <div className="flex-1 space-y-2.5">
        <Header className="" workspaceId={params.workspaceId} />
        <Suspense fallback={<ColumnsContainerSkeleton />}>
          <ColumnsWrapperServer
            workspaceId={workspace?._id}
            columns={workspace?.columns}
          />
        </Suspense>
      </div>

      <TaskDetailsDialog
        workspaceId={workspace?._id}
        revertBackTo={`/workspaces/${workspace?._id}`}
      />
    </div>
  );
}

export default Page;
