"use client";
import React from "react";
import useWorkspaceItems from "@/utils/hooks/dashboard/useWorkspaceItems";
import TaskListInfiniteScroll from "@/app/(app)/dashboard/components/TaskListInfiniteScroll";
import ussDeadlineTasksToday from "@/utils/hooks/dashboard/ussDeadlineTasksToday";

function TodayTaskInfiniteScrollWrapper() {
  return <TaskListInfiniteScroll useCustomHook={ussDeadlineTasksToday} />;
}

export default TodayTaskInfiniteScrollWrapper;
