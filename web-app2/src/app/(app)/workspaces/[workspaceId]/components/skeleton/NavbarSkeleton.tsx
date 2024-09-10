import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function NavbarSkeleton() {
  return (
    <div className="px-3 py-2.5 bg-transparent flex items-center justify-between rounded-xl">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-48 mb-2" />
        <div className="flex flex-row gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

export default NavbarSkeleton;
