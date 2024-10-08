import React from "react";
import WorkspaceSkeleton from "@/app/(app)/workspaces/components/WorkspaceSkeleton";

function WorkspaceContainerSkeleton() {
  return (
    <div className="py-4 h-[91%] grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 overflow-y-auto">
      <WorkspaceSkeleton />
      <WorkspaceSkeleton />
      <WorkspaceSkeleton />
      <WorkspaceSkeleton />
    </div>
  );
}

export default WorkspaceContainerSkeleton;
