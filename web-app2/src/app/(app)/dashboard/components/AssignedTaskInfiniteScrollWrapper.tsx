"use client";
import React from "react";
import useWorkspaceItems from "@/utils/hooks/dashboard/useWorkspaceItems";
import TaskListInfiniteScroll from "@/app/(app)/dashboard/components/TaskListInfiniteScroll";
import useDeadlineTasksToday from "@/utils/hooks/dashboard/useDeadlineTasksToday";
import useAssignedTasks from "@/utils/hooks/dashboard/useAssignedTasks";

function AssignedTaskInfiniteScrollWrapper() {
  return <TaskListInfiniteScroll useCustomHook={useAssignedTasks} />;
}

export default AssignedTaskInfiniteScrollWrapper;
