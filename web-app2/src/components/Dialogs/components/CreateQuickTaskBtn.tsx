"use client";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { useCreateTask } from "@/utils/hooks/task/useCreateTask";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { shallow } from "zustand/shallow";

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
  } = useCreateTask(projectId as string);
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
    console.log({
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
    if (projectId === "") {
      toast({ title: "please select a workspace" });
    }
    if (columnId === "") {
      toast({ title: "please select a column" });
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

    if (isError) toast({ title: error?.message });
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
