import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

function AssignedTaskSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between px-3 py-2 border-[1px] border-gray-200 rounded-xl">
      <div>
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded-full" />
          ))}
        </div>
        <div className="flex flex-row items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssignedTaskSkeleton;
