"use client";
import React, { useEffect } from "react";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import { useInView } from "react-intersection-observer";
import AssignedTaskSkeleton from "@/app/(app)/dashboard/components/skeletons/AssignedTaskSkeleton";
import NoTasksFound from "@/app/(app)/dashboard/components/NoTasksFound";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "react-query";
import { IDashboardTask } from "@/utils/@types/task";
import { useSearchParams } from "next/navigation";
type TaskListProps = {
  useCustomHook: () => {
    isLoading: false | true;
    fetchNextPage: (
      options?: FetchNextPageOptions
    ) => Promise<
      InfiniteQueryObserverResult<
        { data: IDashboardTask[]; count: number },
        unknown
      >
    >;
    isError: false | true;
    data: undefined | InfiniteData<{ data: IDashboardTask[]; count: number }>;
    isFetchingNextPage: boolean;
    error: unknown;
  };
};
function TaskListInfiniteScroll({ useCustomHook }: TaskListProps) {
  const searchParams = useSearchParams();

  const selectedWorkspaceId = searchParams.get("workspaceId");
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isError, error } =
    useCustomHook();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <React.Fragment>
      {data?.pages.map((page, index) => {
        const tasks = page.data.filter((task) => {
          // Only filter by workspace ID if selectedWorkspaceId is defined
          return (
            !selectedWorkspaceId ||
            task.workspace._id.toString() === selectedWorkspaceId
          );
        });
        if (page.data.length === 0) return <NoTasksFound />;
        return page.data.map((task) => (
          <AssignedTask
            key={task._id}
            data={JSON.parse(JSON.stringify(task))}
          />
        ));
      })}
      <div ref={ref} className="space-y-2 my-3">
        {(isFetchingNextPage || isLoading) &&
          Array.from({ length: 10 }).map((_, index) => (
            <AssignedTaskSkeleton key={index} />
          ))}
      </div>
    </React.Fragment>
  );
}

export default TaskListInfiniteScroll;
