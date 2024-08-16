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
  };

  const handleClick = (event: { target: { innerText: string } }) => {
    handleChange(event.target.innerText);
  };
  return (
    <TabsList onClick={handleClick}>
      <TabsTrigger value="kanban">kanban</TabsTrigger>
      <TabsTrigger value="chats">chats</TabsTrigger>
      <TabsTrigger value="calendar">calendar</TabsTrigger>
    </TabsList>
  );
}

export default WorkspaceTabs;
