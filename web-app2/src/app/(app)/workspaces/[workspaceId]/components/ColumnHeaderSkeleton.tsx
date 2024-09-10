import React from "react";
import { MoreVertical } from "react-feather";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { Skeleton } from "@/components/ui/skeleton";
function ColumnHeaderSkeleton() {
  return (
    <div className={"w-full flex flex-row items-center justify-between"}>
      <div className="flex flex-row space-x-2 w-[300px]">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="w-[180px] h-8">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="w-8 h-8">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default ColumnHeaderSkeleton;
