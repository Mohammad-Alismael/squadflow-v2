import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function WorkspaceSkeleton() {
  return (
    <Card className="p-2 space-y-2 h-24">
      <Skeleton className="h-8 w-full" />
      <div className="flex flex-row gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </Card>
  );
}

export default WorkspaceSkeleton;
