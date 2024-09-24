"use client";
import React from "react";
import useWorkspaceItems from "@/utils/hooks/dashboard/useWorkspaceItems";
import TaskListInfiniteScroll from "@/app/(app)/dashboard/components/TaskListInfiniteScroll";
import ussDeadlineTasksToday from "@/utils/hooks/dashboard/ussDeadlineTasksToday";
import useAssignedTasks from "@/utils/hooks/dashboard/useAssignedTasks";

function AssignedTaskInfiniteScrollWrapper() {
  return <TaskListInfiniteScroll useCustomHook={useAssignedTasks} />;
}

export default AssignedTaskInfiniteScrollWrapper;
