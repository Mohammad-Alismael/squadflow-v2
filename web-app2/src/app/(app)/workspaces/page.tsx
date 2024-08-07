import React, { Suspense } from "react";
import Header from "@/app/(app)/workspaces/components/Header";
import Navbar from "@/components/Navbar";
import WorkspacesContainer from "./components/WorkspacesContainer";
import WorkspaceContainerSkeleton from "@/app/(app)/workspaces/components/WorkspaceContainerSkeleton";
import UpdateWorkspaceDialog from "@/components/Dialogs/UpdateWorkspaceDialog";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <div className="h-full flex flex-col">
        <Navbar>
          <div>
            <p className="text-2xl">Workspaces</p>
            <p className="text-sm opacity-50">never try to give up.</p>
          </div>
        </Navbar>
        <div className="flex flex-col flex-grow">
          <Header />
          <Suspense fallback={<WorkspaceContainerSkeleton />}>
            <WorkspacesContainer
              viewType={searchParams["view"]}
              sortType={searchParams["sort"]}
            />
          </Suspense>
        </div>
      </div>
      <UpdateWorkspaceDialog />
    </>
  );
}

export default Page;
