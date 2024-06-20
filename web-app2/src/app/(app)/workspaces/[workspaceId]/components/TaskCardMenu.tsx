"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import { handleDeleteTask } from "@/app/(app)/workspaces/[workspaceId]/actions";

function TaskCardMenu({ taskId }: { taskId: string }) {
  const router = useRouter();

  const handleChange = async () => {
    await handleDeleteTask(taskId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => e.stopPropagation()} // Stop event propagation
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-50">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleChange();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskCardMenu;
