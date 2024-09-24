import React from "react";
import AssignedTaskInfiniteScrollWrapper from "@/app/(app)/dashboard/components/AssignedTaskInfiniteScrollWrapper";

async function AssignedTasks() {
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <h4 className="capitalize font-bold">tasks assigned to you</h4>
      <div className="max-h-72 space-y-2 my-2 overflow-y-auto">
        <AssignedTaskInfiniteScrollWrapper />
      </div>
    </div>
  );
}

export default AssignedTasks;
