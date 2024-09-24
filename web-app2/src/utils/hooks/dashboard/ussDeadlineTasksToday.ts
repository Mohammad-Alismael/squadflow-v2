import { useInfiniteQuery } from "react-query";
import {
  getAllTasksAction,
  getAllTasksDeadLineByTodayAction,
} from "@/utils/actions/dashboard-actions";
import { IDashboardTask } from "@/utils/@types/task";
import { useSearchParams } from "next/navigation";
async function fetchItems(pageParam: number, selectedWorkspaceId: string) {
  const res = await getAllTasksDeadLineByTodayAction(pageParam, 10);
  return JSON.parse(JSON.stringify(res)) as {
    data: IDashboardTask[];
    count: number;
  };
}
const ussDeadlineTasksToday = () => {
  const searchParams = useSearchParams();

  const { data, fetchNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: [`ussDeadlineTasksToday-${searchParams.get("workspaceId")}`],
      queryFn: ({ pageParam = 1 }) =>
        fetchItems(pageParam, searchParams.get("workspaceId") as string),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.count / 10 ? nextPage : undefined;
      },
    });

  return {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};

export default ussDeadlineTasksToday;
