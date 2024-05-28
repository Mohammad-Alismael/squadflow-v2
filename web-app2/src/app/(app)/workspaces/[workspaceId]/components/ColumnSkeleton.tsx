import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

function ColumnSkeleton() {
  return (
    <div className="rounded-xl h-full w-1/4 bg-white p-4 space-y-2">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export default ColumnSkeleton;
