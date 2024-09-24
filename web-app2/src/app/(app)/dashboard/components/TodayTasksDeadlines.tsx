import React from "react";
import TodayTaskInfiniteScrollWrapper from "@/app/(app)/dashboard/components/TodayTaskInfiniteScrollWrapper";
TodayTasksDeadlines.propTypes = {};

async function TodayTasksDeadlines({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <h4 className="capitalize font-bold">tasks deadline by today</h4>
      <div className="h-[90%] space-y-2 my-2 overflow-auto">
        <TodayTaskInfiniteScrollWrapper />
      </div>
    </div>
  );
}

export default TodayTasksDeadlines;
