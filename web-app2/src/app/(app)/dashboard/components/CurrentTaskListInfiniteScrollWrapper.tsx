"use client";
import React from "react";
import useWorkspaceItems from "@/utils/hooks/dashboard/useWorkspaceItems";
import TaskListInfiniteScroll from "@/app/(app)/dashboard/components/TaskListInfiniteScroll";

function CurrentTaskListInfiniteScrollWrapper() {
  return <TaskListInfiniteScroll useCustomHook={useWorkspaceItems} />;
}

export default CurrentTaskListInfiniteScrollWrapper;
