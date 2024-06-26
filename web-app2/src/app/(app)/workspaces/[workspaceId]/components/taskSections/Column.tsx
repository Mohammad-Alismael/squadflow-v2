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
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

function Column() {
  const { workspaceId } = useParams();
  const columnId = useTaskPropertiesStore((state) => state.columnId);
  const { data, isLoading } = useGetWorkspaceColumnsById(workspaceId as string);
  return (
    <div className="flex flex-row items-center gap-8">
      <h3 className="font-bold">column</h3>
      {isLoading && <p>loading ...</p>}
      {!isLoading && (
        <Select defaultValue={columnId}>
          <SelectTrigger className="w-[160px] h-[41px] bg-gray-100">
            <SelectValue placeholder="select order list" />
          </SelectTrigger>
          <SelectContent>
            {!isLoading &&
              data?.map((column) => (
                <SelectItem value={column._id}>{column.title}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

export default Column;
