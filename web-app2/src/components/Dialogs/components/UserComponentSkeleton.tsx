import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function UserComponentSkeleton() {
  return (
    <div className="py-2 px-3 flex flex-row justify-between items-center gap-4 hover:bg-gray-100">
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="w-[120px] h-[31px] rounded" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
}

export default UserComponentSkeleton;
