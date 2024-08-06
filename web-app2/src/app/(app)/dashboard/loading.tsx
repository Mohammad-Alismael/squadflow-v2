import React, { Suspense } from "react";
import CurrentTaskListSkeleton from "@/app/(app)/dashboard/components/skeletons/CurrentTaskListSkeleton";
import TodayTaskDeadlinesSkeleton from "@/app/(app)/dashboard/components/skeletons/TodayTaskDeadlinesSkeleton";
import AssignedTasksSkeleton from "@/app/(app)/dashboard/components/skeletons/AssignedTasksSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
Loading.propTypes = {};

function Loading() {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex flex-wrap items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="w-9 h-9 rounded-xl" />
          <div className="flex items-center">
            <Skeleton className="w-9 h-9 rounded-full" />
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white shadow-md">
        <div className="flex flex-col">
          <Skeleton className="w-1/2 h-8 mb-2" />
          <Skeleton className="w-1/3 h-6 opacity-50" />
        </div>
      </div>
      <div className="space-y-4 md:flex-1 md:space-y-0">
        <div className="w-full h-96 md:w-2/3 md:h-full float-left md:pr-4">
          <CurrentTaskListSkeleton />
        </div>
        <div className="w-full md:w-1/3 md:h-full float-right flex flex-col gap-4">
          <TodayTaskDeadlinesSkeleton />
          <AssignedTasksSkeleton />
        </div>
      </div>
    </div>
  );
}

export default Loading;
