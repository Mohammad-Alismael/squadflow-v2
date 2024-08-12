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
import { useQueryClient } from "react-query";
import { deleteColumn } from "@/utils/actions/workspace-actions";
import { revalidateURL } from "@/components/Dialogs/actions";
import { getWorkspaceIdFromUrl } from "@/components/Dialogs/components/DNDColumn";
import { useToast } from "@/components/ui/use-toast";

function ColumnMenu({
  columnId,
  onEdit,
}: {
  columnId: string;
  onEdit: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handlePressOnIcon = async () => {
    try {
      const workspaceId = getWorkspaceIdFromUrl(window.location.href);
      workspaceId && (await deleteColumn(workspaceId as string, columnId));
      await queryClient.invalidateQueries([workspaceId]);
      await queryClient.refetchQueries([workspaceId]);
      revalidateURL(workspaceId as string);
      toast({ title: "successfully deleted column" });
    } catch (e) {
      toast({ title: e.message });
    }
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
            onEdit();
          }}
        >
          edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handlePressOnIcon();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnMenu;
