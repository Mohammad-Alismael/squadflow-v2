import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

function ColumnSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 rounded-xl h-[36rem] min-w-80 sm:w-auto bg-gray-300 p-3">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export default ColumnSkeleton;
