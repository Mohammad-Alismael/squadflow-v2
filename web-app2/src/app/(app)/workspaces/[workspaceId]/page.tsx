import React, { Suspense } from "react";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/Column";
import { cookies } from "next/headers";
import WorkspaceNavbar from "@/app/(app)/workspaces/[workspaceId]/components/WorkspaceNavbar";
import Header from "@/app/(app)/workspaces/[workspaceId]/components/Header";
import Head from "next/head";

const fetchWorkspace = async (workspaceId: string) => {
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
      <Head>
        <title>{workspace?.title}</title>
      </Head>
      <Suspense fallback={<p>loading...</p>}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <Header className="mt-0 mb-4" workspaceId={params.workspaceId} />

      <div className="h-full flex flex-row gap-4">
        {workspace &&
          workspace?.columns.map((column) => {
            return (
              <Column
                key={column._id}
                workspaceId={params.workspaceId}
                data={column}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Page;
