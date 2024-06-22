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

async function Page({ params }: { params: { workspaceId: string } }) {
  const workspaceData = fetchWorkspace(params.workspaceId);
  const workspaceTasks = getTasksForWorkspace(params.workspaceId);
  const [workspace, tasks] = await Promise.all([workspaceData, workspaceTasks]);
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<p>loading...</p>}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <div className="flex-1 space-y-2.5">
        <Header className="" workspaceId={params.workspaceId} />
        <ColumnsContainer
          workspaceId={workspace?._id}
          columns={workspace?.columns}
          tasks={tasks}
        />
      </div>

      <TaskDetailsDialog
        workspaceId={workspace?._id}
        revertBackTo={`/workspaces/${workspace?._id}`}
      />
    </div>
  );
}

export default Page;
