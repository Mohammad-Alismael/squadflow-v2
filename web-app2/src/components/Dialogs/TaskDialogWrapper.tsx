"use client";
import React, { useEffect } from "react";
import { TaskResponse } from "@/utils/@types/task";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { useMediaQuery } from "@/utils/hooks/use-media-query";

function TaskDialogWrapper({
  taskId,
  workspaceId,
  data,
  children,
}: {
  taskId: string | undefined;
  workspaceId: string;
  data: TaskResponse;
  children: React.ReactNode[];
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const resetCustomState = useTaskPropertiesStore(
    (state) => state.resetCustomState
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = () => {
    // router.replace(window.location.href.split("?")[0]);
    router.back();
  };
  useEffect(() => {
    if (data) {
      const {
        title,
        dueDate,
        dueTime,
        columnId,
        comments,
        priority,
        participants,
        labels,
        description,
        attachments,
        _id,
      } = data;
      resetCustomState({
        title,
        projectId: data.workspace.toString(),
        taskDate: dueDate,
        endTime: dueTime,
        columnId,
        comments,
        priority,
        participants,
        labels,
        description,
        attachments,
        taskId: _id,
      });
    }
  }, [JSON.stringify(data), taskId]);
  return (
    <Dialog
      open={Boolean(taskId)}
      onOpenChange={() => {
        handleChange();
        // redirectServer(workspaceId);
      }}
    >
      <DialogOverlay>{isDesktop ? children[0] : children[1]}</DialogOverlay>
    </Dialog>
  );
}

export default TaskDialogWrapper;
