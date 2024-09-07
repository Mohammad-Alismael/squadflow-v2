import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

Loading.propTypes = {};

function Loading() {
  return (
    <div className="space-y-2 w-full h-full">
      <div className="flex flex-row space-x-2 w-[400px]">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      <div className="w-full h-full">
        {/* Skeleton for SelectWorkspace */}
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}

export default Loading;
