"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { handleDeleteWorkspace } from "@/app/(app)/workspaces/actions";

function WorkspaceMenu({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();

  const handleChange = async () => {
    await handleDeleteWorkspace(workspaceId);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() =>
            router.replace(`/workspaces?workspaceId=${workspaceId}`)
          }
        >
          edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleChange}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceMenu;
