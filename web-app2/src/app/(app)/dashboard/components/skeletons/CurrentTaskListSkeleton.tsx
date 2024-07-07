import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

CurrentTaskListSkeleton.propTypes = {};

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
          <div
            key={index}
            className="flex flex-row items-center justify-between px-3 py-2 border-[1px] border-gray-200 rounded-xl"
          >
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
        ))}
      </div>
    </div>
  );
}

export default CurrentTaskListSkeleton;
