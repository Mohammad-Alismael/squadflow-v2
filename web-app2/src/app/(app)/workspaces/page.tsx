import React, { Suspense } from "react";
import Header from "@/app/(app)/workspaces/components/Header";
import Navbar from "@/components/Navbar";
import WorkspacesContainer from "./components/WorkspacesContainer";
import WorkspaceContainerSkeleton from "@/app/(app)/workspaces/components/WorkspaceContainerSkeleton";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  console.log({ view: searchParams["view"] });
  return (
    <div className="h-full flex flex-col">
      <Navbar>
        <div>
          <p className="text-2xl">Workspaces</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="flex-grow">
        <Header />
        <Suspense fallback={<WorkspaceContainerSkeleton />}>
          <WorkspacesContainer viewType={searchParams["view"]} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
