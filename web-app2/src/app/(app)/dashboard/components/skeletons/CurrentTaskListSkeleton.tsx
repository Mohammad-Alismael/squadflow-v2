import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";
import AssignedTaskSkeleton from "@/app/(app)/dashboard/components/skeletons/AssignedTaskSkeleton";

function CurrentTaskListSkeleton() {
  return (
    <div className="flex flex-col h-full px-3 py-2.5 bg-white rounded-xl">
      <div className="flex flex-row items-center justify-between mb-3">
        <div className="flex flex-col gap-2 items-start flex-shrink-0">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="space-y-2 my-3 max-h-[38rem] overflow-y-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <AssignedTaskSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default CurrentTaskListSkeleton;
