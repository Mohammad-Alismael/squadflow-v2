"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetWorkspaceColumnsById } from "@/utils/hooks/workspace/useGetWorkspaceColumnsById";
import { useParams } from "next/navigation";
import {
  useTaskPropertiesStore,
  useTaskSelectors,
} from "@/utils/store/taskPropertiesStore";
import { Skeleton } from "@/components/ui/skeleton";

function Column() {
  const workspaceId = useTaskPropertiesStore((state) => state.projectId);
  const { setColumnId } = useTaskPropertiesStore();

  const columnId = useTaskSelectors(useTaskPropertiesStore).getColumnId();
  const { data, isLoading } = useGetWorkspaceColumnsById(workspaceId as string);
  return (
    <div className="flex flex-row items-center gap-8">
      <h3 className="font-bold">column</h3>
      {isLoading && <Skeleton className="h-10 w-40" />}
      {!isLoading && (
        <Select onValueChange={setColumnId} defaultValue={columnId}>
          <SelectTrigger className="w-[160px] h-[41px] bg-gray-100">
            <SelectValue placeholder="select order list" />
          </SelectTrigger>
          <SelectContent>
            {!isLoading &&
              data?.map((column) => (
                <SelectItem key={column._id} value={column._id}>
                  {column.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

export default Column;
