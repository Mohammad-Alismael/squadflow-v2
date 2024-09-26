"use client";
import React from "react";
import useWorkspaceItems from "@/utils/hooks/dashboard/useWorkspaceItems";
import TaskListInfiniteScroll from "@/app/(app)/dashboard/components/TaskListInfiniteScroll";
import useDeadlineTasksToday from "@/utils/hooks/dashboard/useDeadlineTasksToday";

function TodayTaskInfiniteScrollWrapper() {
  return <TaskListInfiniteScroll useCustomHook={useDeadlineTasksToday} />;
}

export default TodayTaskInfiniteScrollWrapper;
