import React, { Suspense } from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { cookies } from "next/headers";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import Header from "@/app/(app)/workspaces/[workspaceId]/components/Header";
import Head from "next/head";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import ColumnSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnSkeleton";

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
      <Header className="mt-0 mb-1" workspaceId={params.workspaceId} />

      <div className="h-full flex flex-row gap-4 py-4">
        {workspace &&
          workspace?.columns.map(
            (column: {
              _id: string;
              order: number;
              title: string;
              color: string;
            }) => {
              return (
                <Suspense
                  key={`column-${column._id}`}
                  fallback={<ColumnSkeleton />}
                >
                  <Column
                    key={column._id}
                    workspaceId={params.workspaceId}
                    data={column}
                  />
                </Suspense>
              );
            }
          )}
      </div>
      <TaskDetailsDialog workspaceId={workspace?._id} />
    </div>
  );
}

export default Page;
