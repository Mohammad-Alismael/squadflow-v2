import React, { Suspense } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "@/components/ui/skeleton";
import WorkspaceNavbar from "@/components/WorkspaceNavbar";

Page.propTypes = {};

function Page({ params }: { params: { workspaceId: string } }) {
  return (
    <>
      <Suspense fallback={<Skeleton className="h-12 w-full" />}>
        <WorkspaceNavbar workspaceId={params.workspaceId} />
      </Suspense>
      <p>this is workspace page{params.workspaceId}</p>
    </>
  );
}

export default Page;
