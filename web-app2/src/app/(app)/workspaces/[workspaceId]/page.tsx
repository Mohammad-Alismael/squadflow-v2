import React, { Suspense } from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { cookies } from "next/headers";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
const fetchTasksForWorkspace = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks`,
    {
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
  const data = await fetchTasksForWorkspace(params.workspaceId);
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<p>loading...</p>}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <div>
        <Column cards={data} />
        <Column cards={data} />
        <Column cards={data} />
      </div>
    </div>
  );
}

export default Page;
