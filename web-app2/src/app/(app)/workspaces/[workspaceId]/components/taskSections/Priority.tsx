"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { shallow } from "zustand/shallow";

function Priority() {
  const setPriority = useTaskPropertiesStore((state) => state.setPriority);
  const priority = useTaskPropertiesStore((state) => state.priority, shallow);
  return (
    <div className="flex flex-row items-center gap-8">
      <h3 className="font-bold">priority</h3>
      <Select onValueChange={setPriority} defaultValue={priority.toLowerCase()}>
        <SelectTrigger className="w-[160px] h-[41px] bg-gray-100">
          <SelectValue placeholder="select order list" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">low</SelectItem>
          <SelectItem value="mid">mid</SelectItem>
          <SelectItem value="high">high</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Priority;
