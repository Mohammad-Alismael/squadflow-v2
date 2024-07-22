"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

function TasksSearch({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("keyword", e.target.value);
    router.replace(`/workspaces/${workspaceId}?${params.toString()}`);
  };
  return (
    <div className="flex flex-row items-center gap-4">
      <Input
        onChange={handleChange}
        type="text"
        placeholder="search for task title ..."
        // className="w-1/4"
      />
    </div>
  );
}

export default TasksSearch;
