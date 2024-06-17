import React, { Suspense } from "react";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import Header from "@/app/(app)/workspaces/[workspaceId]/components/Header";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
const ColumnsContainer = dynamic(
  () =>
    import("@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer"),
  {
    // loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
import { cookies, headers } from "next/headers";
import ColumnsWrapper from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsWrapper";
import dynamic from "next/dynamic";

const fetchWorkspace = async (workspaceId: string) => {
  if (!workspaceId) return null;
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      next: { revalidate: 1 },
      method: "GET",
      headers: { Cookie: cookies().toString() },
    }
  );
  if (res.ok) {
    return res.json();
  }
  return null;
};
export const fetchTasksForWorkspace = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks`,
    {
      next: { tags: ["tasks"] },
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};

async function Page({ params }: { params: { workspaceId: string } }) {
  const workspaceData = fetchWorkspace(params.workspaceId);
  const workspaceTasks = fetchTasksForWorkspace(params.workspaceId);
  const [workspace, tasks] = await Promise.all([workspaceData, workspaceTasks]);
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<p>loading...</p>}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <Header className="mb-2" workspaceId={params.workspaceId} />
      <ColumnsContainer
        workspaceId={workspace?._id}
        columns={workspace?.columns}
        tasks={tasks}
      />

      <TaskDetailsDialog workspaceId={workspace?._id} />
    </div>
  );
}

export default Page;
