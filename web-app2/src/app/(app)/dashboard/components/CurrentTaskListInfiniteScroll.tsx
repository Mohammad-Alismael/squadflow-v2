"use client";
import React, { useEffect } from "react";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import { getAllTasksAction } from "@/utils/actions/dashboard-actions";
import { useInfiniteQuery } from "react-query";
import { IDashboardTask } from "@/utils/@types/task";
import { useInView } from "react-intersection-observer";
import AssignedTaskSkeleton from "@/app/(app)/dashboard/components/skeletons/AssignedTaskSkeleton";
import NoTasksFound from "@/app/(app)/dashboard/components/NoTasksFound";
import { useSearchParams } from "next/navigation";

async function fetchItems(pageParam: number, selectedWorkspaceId: string) {
  const res = await getAllTasksAction(selectedWorkspaceId, pageParam, 10);
  return JSON.parse(JSON.stringify(res)) as {
    data: IDashboardTask[];
    count: number;
  };
}
function CurrentTaskListInfiniteScroll({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const searchParams = useSearchParams();
  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [`query-${searchParams.get("workspaceId")}`],
      queryFn: ({ pageParam = 1 }) =>
        fetchItems(pageParam, searchParams.get("workspaceId") as string),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.count / 10 ? nextPage : undefined;
      },
    });

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
      {/*{tasks.length === 0 && <NoTasksFound />}*/}
    </React.Fragment>
  );
}

export default CurrentTaskListInfiniteScroll;
