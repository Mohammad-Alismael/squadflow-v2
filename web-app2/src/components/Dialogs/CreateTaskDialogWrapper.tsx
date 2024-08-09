"use client";
import React, { useEffect, useState } from "react";
import { TaskResponse } from "@/utils/@types/task";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { redirectServer } from "@/app/(app)/workspaces/[workspaceId]/actions";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { useDialog } from "@/utils/store/DialogStore";
import { shallow } from "zustand/shallow";

function CreateTaskDialogWrapper({
  workspaceId,
  columnId,
  children,
}: {
  columnId: string;
  workspaceId: string;
  children: React.ReactNode[];
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const setProjectId = useTaskPropertiesStore((state) => state.setProjectId);
  const setColumnId = useTaskPropertiesStore((state) => state.setColumnId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpened = useDialog((state) => state.isOpen, shallow);
  useEffect(() => {
    workspaceId && setProjectId(workspaceId as string);
    searchParams &&
      searchParams.get("columnId") &&
      setColumnId(searchParams.get("columnId") as string);
  }, [workspaceId]);

  return (
    <Dialog
      open={isOpened}
      onOpenChange={() => {
        router.replace(`/workspaces/${workspaceId}`);
      }}
    >
      <DialogOverlay>{isDesktop ? children[0] : children[1]}</DialogOverlay>
    </Dialog>
  );
}

export default CreateTaskDialogWrapper;
