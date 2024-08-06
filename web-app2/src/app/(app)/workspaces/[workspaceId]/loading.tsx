import React, { Suspense } from "react";
import ColumnsContainerSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/ColumnsContainerSkeleton";
import NavbarSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/skeleton/NavbarSkeleton";
import ColumnHeaderSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeaderSkeleton";

function Loading() {
  return (
    <div className="h-full flex flex-col">
      <NavbarSkeleton />
      <div className="space-y-2.5">
        <ColumnHeaderSkeleton />
        <ColumnsContainerSkeleton />
      </div>
    </div>
  );
}

export default Loading;
