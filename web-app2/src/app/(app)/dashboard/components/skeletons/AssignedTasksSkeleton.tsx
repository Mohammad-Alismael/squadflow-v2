import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function AssignedTasksSkeleton() {
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="h-[90%] space-y-2 my-2 overflow-auto">
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

export default AssignedTasksSkeleton;
