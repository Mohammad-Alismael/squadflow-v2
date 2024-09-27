"use client";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { useCreateTask } from "@/utils/hooks/task/useCreateTask";
import { toast, useToast } from "@/components/ui/use-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { shallow } from "zustand/shallow";
import {
  getErrorMessage,
  getRoleValue,
  USER_ROLES,
} from "@/utils/helper-client";
import { useGetWorkspacePrivilege } from "@/utils/hooks/workspace/useGetWorkspacePrivilege";
import { useGetTasksById } from "@/utils/hooks/task/useGetTasksById";
import {
  useUpdateTask,
  useUpdateTaskv2,
} from "@/utils/hooks/task/useUpdateTask";
import { revalidateURL } from "@/components/Dialogs/actions";
import { useQueryClient } from "react-query";
import { redirectServer } from "@/app/(app)/workspaces/[workspaceId]/actions";
import { useDialog } from "@/utils/store/DialogStore";

function CreateTaskBtn({
  columnId,
  workspaceId,
}: {
  columnId: string;
  workspaceId: string;
}) {
  const { data: role, isLoading: isLoadingPrivilege } =
    useGetWorkspacePrivilege(workspaceId);

  const {
    mutate: createMutation,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useCreateTask(workspaceId as string, true);

  const handleCreateTask = async () => {
    const {
      taskId,
      title,
      description,
      taskDate,
      endTime,
      priority,
      participants,
      labels,
      subTasks,
      attachments,
      comments,
    } = useTaskPropertiesStore.getState();
    createMutation({
      workspace: workspaceId,
      columnId,
      title,
      description,
      dueDate: taskDate,
      dueTime: endTime,
      priority,
      participants,
      labels,
      subTasks,
      attachments,
      comments,
    });
  };

  if (!isLoadingPrivilege && role !== getRoleValue(USER_ROLES.viewer))
    return (
      <Button
        className="w-full bg-green-700"
        onClick={handleCreateTask}
        disabled={isLoading}
      >
        {!isLoading ? "create task" : "loading ..."}
      </Button>
    );
}

export default CreateTaskBtn;
