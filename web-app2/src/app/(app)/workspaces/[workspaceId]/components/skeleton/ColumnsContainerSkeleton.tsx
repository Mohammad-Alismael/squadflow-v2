import React from "react";
import ColumnSkeleton from "@/app/(app)/workspaces/[workspaceId]/components/ColumnSkeleton";
function ColumnsContainerSkeleton() {
  return (
    <div className="h-[84.5%] flex flex-row gap-4 py-2">
      {Array.from({ length: 3 }).map((column, index) => (
        <ColumnSkeleton key={index} />
      ))}
    </div>
  );
}

export default ColumnsContainerSkeleton;
