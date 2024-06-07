import React, { Suspense } from "react";
import { cookies } from "next/headers";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import Header from "@/app/(app)/workspaces/[workspaceId]/components/Header";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import ColumnsContainer from "@/app/(app)/workspaces/[workspaceId]/components/ColumnsContainer";

const fetchWorkspace = async (workspaceId: string) => {
  if (!workspaceId) return null;
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return null;
};

async function Page({ params }: { params: { workspaceId: string } }) {
  const workspaceData = fetchWorkspace(params.workspaceId);
  const [workspace] = await Promise.all([workspaceData]);
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<p>loading...</p>}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <Header className="mb-2" workspaceId={params.workspaceId} />
      <ColumnsContainer workspace={workspace} />
      <TaskDetailsDialog workspaceId={workspace?._id} />
    </div>
  );
}

export default Page;
