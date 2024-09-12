"use client";
import React, { useEffect } from "react";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import { getAllTasksAction } from "@/utils/actions/dashboard-actions";
import { useInfiniteQuery } from "react-query";
import { IDashboardTask } from "@/utils/@types/task";
import { useInView } from "react-intersection-observer";
import AssignedTaskSkeleton from "@/app/(app)/dashboard/components/skeletons/AssignedTaskSkeleton";

async function fetchItems(pageParam: number) {
  const res = await getAllTasksAction(pageParam, 10);
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
  // const { _id: userId, communityId } = await getUserAuthFromJWT();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["query"],
    queryFn: ({ pageParam = 1 }) => fetchItems(pageParam),
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
    <div className="flex flex-col h-full px-3 py-2.5 bg-white rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <div className="w-[90%] flex flex-col gap-2 items-start flex-shrink-0">
          <h4 className="capitalize font-bold">all tasks</h4>
          {/*<WorkspaceLabels />*/}
        </div>
        {/*{communityId !== "" && <CreateQuickTaskDialog />}*/}
        <p>{data?.pages.map((page) => page.data.length)}</p>
      </div>
      <div className="space-y-2 my-3 h-[38rem] overflow-y-auto">
        {data?.pages.map((page, index) =>
          page.data.map((task) => (
            <AssignedTask
              key={task._id}
              data={JSON.parse(JSON.stringify(task))}
            />
          ))
        )}
        <div ref={ref} className="space-y-2 my-3">
          {isFetchingNextPage &&
            Array.from({ length: 10 }).map((_, index) => (
              <AssignedTaskSkeleton key={index} />
            ))}
        </div>
        {/*{tasks.length === 0 && <NoTasksFound />}*/}
      </div>
    </div>
  );
}

export default CurrentTaskListInfiniteScroll;
