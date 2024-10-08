"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { useCreateTask } from "@/utils/hooks/task/useCreateTask";
import { useToast } from "@/components/ui/use-toast";
import { shallow } from "zustand/shallow";
import { getErrorMessage } from "@/utils/helper-client";

CreateQuickTaskBtn.propTypes = {};

function CreateQuickTaskBtn() {
  const { toast } = useToast();
  const projectId = useTaskPropertiesStore((state) => state.projectId, shallow);
  const reset = useTaskPropertiesStore((state) => state.resetState);
  const {
    mutate: createMutation,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useCreateTask(projectId as string, false);
  const handleCreateTask = async () => {
    const {
      projectId,
      columnId,
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
    if (projectId === "") {
      toast({ title: "please select a workspace" });
      return;
    }
    if (columnId === "") {
      toast({ title: "please select a column" });
      return;
    }
    createMutation({
      workspace: projectId,
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
    if (!isError && isSuccess) {
      reset();
    }

    if (isError) toast({ title: getErrorMessage(error) });
  };

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

export default CreateQuickTaskBtn;
