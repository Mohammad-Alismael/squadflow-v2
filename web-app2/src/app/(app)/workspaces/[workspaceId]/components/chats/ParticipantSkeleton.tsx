import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ParticipantSkeleton() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex flex-col justify-between">
        <Skeleton className="w-24 h-6 mb-1" />
        <Skeleton className="w-36 h-4 opacity-70" />
      </div>
    </div>
  );
}

export default ParticipantSkeleton;
