import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function WorkspacesListSkeleton() {
  return (
    <>
      <div className="bg-white flex flex-row items-center justify-between p-4 border-r-2 border-gray-200 rounded-tl">
        <h4 className="text-xl font-bold capitalize">workspaces</h4>
        <Skeleton className="w-6 h-6" />
      </div>
      <div className="flex-1 flex flex-col space-y-2 p-4 bg-gray-300 overflow-y-auto">
        {/* Skeletons for Workspace List */}
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    </>
  );
}

export default WorkspacesListSkeleton;
