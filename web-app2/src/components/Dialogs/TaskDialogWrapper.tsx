"use client";
import React, { useEffect } from "react";
import { TaskResponse } from "@/utils/@types/task";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { redirect } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { redirectServer } from "@/app/(app)/workspaces/[workspaceId]/actions";
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
        redirectServer(workspaceId);
      }}
    >
      {isDesktop ? children[0] : children[1]}
    </Dialog>
  );
}

export default TaskDialogWrapper;
