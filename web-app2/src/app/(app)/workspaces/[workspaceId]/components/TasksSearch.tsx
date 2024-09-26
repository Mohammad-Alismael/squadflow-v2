"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

function TasksSearch({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);
    if (value.trim() === "") params.delete("keyword");
    else params.set("keyword", value);
    router.replace(`/workspaces/${workspaceId}?${params.toString()}`);
  };
  return (
    <div className="flex flex-row items-center gap-4">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        placeholder="search for task title ..."
        className="h-[2.3rem]"
      />
    </div>
  );
}

export default TasksSearch;
