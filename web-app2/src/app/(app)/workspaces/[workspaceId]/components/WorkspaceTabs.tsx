"use client";
import React from "react";
import PropTypes from "prop-types";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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

  const handleClick = (event: any) => {
    handleChange(event.target.innerText);
  };
  return (
    <TabsList className="">
      <TabsTrigger value="kanban" asChild>
        <span onClick={() => handleChange("kanban")}>kanban</span>
      </TabsTrigger>
      <TabsTrigger value="chats" asChild>
        <span onClick={() => handleChange("chats")}>chats</span>
      </TabsTrigger>
      <TabsTrigger value="calendar" asChild>
        <span onClick={() => handleChange("calendar")}>calendar</span>
      </TabsTrigger>
    </TabsList>
  );
}

export default WorkspaceTabs;
