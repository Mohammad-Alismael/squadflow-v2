import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function WorkspaceSkeleton() {
  return (
    <Card className="p-2 space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-[140px] w-full rounded-xl" />
      <div className="flex flex-row gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <Skeleton className="h-8 w-full" />
    </Card>
  );
}

export default WorkspaceSkeleton;
