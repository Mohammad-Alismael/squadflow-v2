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
import { getRoleValue, USER_ROLES } from "@/utils/helper-client";
import { useGetWorkspacePrivilege } from "@/utils/hooks/workspace/useGetWorkspacePrivilege";
import { useGetTasksById } from "@/utils/hooks/task/useGetTasksById";
import {
  useUpdateTask,
  useUpdateTaskv2,
} from "@/utils/hooks/task/useUpdateTask";
import { revalidateURL } from "@/components/Dialogs/actions";
import { useQueryClient } from "react-query";
import { redirectServer } from "@/app/(app)/workspaces/[workspaceId]/actions";

function CreateTaskBtn({
  workspaceId,
  revertBackTo,
}: {
  workspaceId: string;
  revertBackTo: string;
}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("taskId") as string;

  const reset = useTaskPropertiesStore((state) => state.resetState);
  const { data: role, isLoading: isLoadingPrivilege } =
    useGetWorkspacePrivilege(workspaceId);

  const onSuccess = async () => {
    toast({
      title: `Successfully updated task`,
    });
    await queryClient.invalidateQueries([`tasks-${workspaceId}`]);

    revalidateURL(workspaceId as string);
    console.log(window.location.host + revertBackTo);
    router.replace(revertBackTo);
    // router.replace(window.location.href.split("?")[0]);
    reset();
  };

  const {
    mutate: updateMutation,
    isLoading: isLoadingUpdate,
    error,
    isError,
    isSuccess,
  } = useUpdateTaskv2(onSuccess);

  const handleUpdateClick = () => {
    const {
      taskId,
      title,
      description,
      taskDate,
      endTime,
      columnId,
      priority,
      participants,
      labels,
      comments,
    } = useTaskPropertiesStore.getState();
    updateMutation({
      taskId,
      workspace: workspaceId,
      columnId,
      title,
      description,
      dueDate: taskDate,
      dueTime: endTime,
      priority,
      participants: participants.map((item) => item._id),
      labels,
      comments,
    });
  };

  if (!isLoadingPrivilege && role !== getRoleValue(USER_ROLES.viewer))
    return (
      <Button
        className="w-full bg-green-700"
        onClick={handleUpdateClick}
        disabled={isLoadingUpdate}
      >
        {!isLoadingUpdate ? "update task" : "loading ..."}
      </Button>
    );
}

export default CreateTaskBtn;
