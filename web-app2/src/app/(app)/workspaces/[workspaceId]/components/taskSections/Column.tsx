"use client";
import React, { useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetWorkspaceColumnsById } from "@/utils/hooks/workspace/useGetWorkspaceColumnsById";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { shallow } from "zustand/shallow";
import { Skeleton } from "@/components/ui/skeleton";

const Column = React.memo(() => {
  const workspaceId = useTaskPropertiesStore(
    (state) => state.projectId,
    shallow
  );
  const setColumnId = useTaskPropertiesStore((state) => state.setColumnId);
  const columnId = useTaskPropertiesStore((state) => state.columnId, shallow);
  const { data, isLoading, refetch } = useGetWorkspaceColumnsById(
    workspaceId as string
  );

  const handleValueChange = useCallback(
    (value: string) => {
      setColumnId(value);
    },
    [setColumnId]
  );

  return (
    <div className="flex flex-row items-center gap-8">
      <h3 className="font-bold">Column</h3>
      {isLoading && <Skeleton className="h-10 w-40" />}
      {!isLoading && (
        <Select onValueChange={handleValueChange} defaultValue={columnId}>
          <SelectTrigger className="w-[160px] h-[41px] bg-gray-100">
            <SelectValue placeholder="Select order list" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((column) => (
              <SelectItem key={column._id} value={column._id}>
                {column.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
});

export default Column;
