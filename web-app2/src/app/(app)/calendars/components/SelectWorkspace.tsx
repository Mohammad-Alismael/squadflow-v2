"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { IWorkspace } from "@/utils/@types/workspace";
import { useRouter, useSearchParams } from "next/navigation";

function SelectWorkspace({ data }: { data: IWorkspace[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (id: string) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("workspace", id);
    router.replace(`/calendars?${params.toString()}`);
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select workspace" />
      </SelectTrigger>
      <SelectContent>
        {data.map((workspace) => (
          <SelectItem
            key={workspace._id as string}
            value={workspace._id as string}
          >
            {workspace.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectWorkspace;
