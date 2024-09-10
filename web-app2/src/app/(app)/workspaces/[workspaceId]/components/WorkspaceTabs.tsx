"use client";
import React from "react";
import PropTypes from "prop-types";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

function WorkspaceTabs({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (tabName: string) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("tabs", tabName);
    router.replace(`/workspaces/${workspaceId}?${params.toString()}`);
    // window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleChange(event.currentTarget.innerText);
  };
  return (
    <TabsList onClick={handleClick} className="mb-2">
      <TabsTrigger value="kanban">kanban</TabsTrigger>
      <TabsTrigger value="chats">chats</TabsTrigger>
      <TabsTrigger value="calendar">calendar</TabsTrigger>
    </TabsList>
  );
}

export default WorkspaceTabs;
