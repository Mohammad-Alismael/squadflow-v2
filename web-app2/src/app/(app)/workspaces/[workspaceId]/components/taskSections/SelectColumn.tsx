"use client";
import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { shallow } from "zustand/shallow";
SelectColumn.propTypes = {};

function SelectColumn({ data }: { data: WorkspaceColumn[] }) {
  const setColumnId = useTaskPropertiesStore((state) => state.setColumnId);
  const columnId = useTaskPropertiesStore((state) => state.columnId, shallow);

  const handleValueChange = useCallback(
    (value: string) => {
      setColumnId(value);
    },
    [setColumnId]
  );
  return (
    <Select onValueChange={handleValueChange} defaultValue={columnId}>
      <SelectTrigger className="w-[160px] h-[41px] bg-gray-100">
        <SelectValue placeholder="Select order list" />
      </SelectTrigger>
      <SelectContent>
        {data.map((column) => (
          <SelectItem key={column._id} value={column._id}>
            {column.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectColumn;
