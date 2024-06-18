"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "react-query";
import { useGetTasksById } from "@/utils/hooks/task/useGetTasksById";
import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/CommentContainer";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import TaskDetailsDialogSkeleton from "@/components/Dialogs/TaskDetailsDialogSkeleton";
import { useUpdateTask } from "@/utils/hooks/task/useUpdateTask";
import { revalidateURL } from "@/components/Dialogs/actions";
import { useToast } from "@/components/ui/use-toast";

function TaskDetailsDialog({ workspaceId }: { workspaceId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const {
    setTaskId,
    setProjectId,
    setColumnId,
    setTitle,
    setLabels,
    setTaskDate,
    setEndTime,
    setComments,
    setAttachments,
    setDescription,
    setParticipants,
    setPriority,
  } = useTaskPropertiesStore();
  const resetState = useTaskPropertiesStore((state) => state.resetState);
  const { data, isLoading, isRefetching } = useGetTasksById(taskId, true);
  const {
    mutate: updateMutation,
    isLoading: isLoadingUpdate,
    error,
    isError,
    isSuccess,
  } = useUpdateTask();

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
      subTasks,
      attachments,
      comments,
    } = useTaskPropertiesStore.getState();
    console.log({ taskDate, endTime }); // we need to fix this
    updateMutation({
      taskId,
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
    if (!isError) {
      toast({
        title: `successfully updated task`,
      });

      revalidateURL(workspaceId as string);
      resetState();
      window.history.replaceState(null, "", `/workspaces/${workspaceId}`);
    }

    if (isError) toast({ title: error });
  };
  useEffect(() => {
    if (!isLoading && data) {
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
      console.log("useEffect hook taskCard.dialog", data);
      setTaskId(_id as string);
      setProjectId(workspaceId);
      setColumnId(columnId);
      setDescription(description);
      setTitle(title);
      setTaskDate(dueDate);
      setEndTime(dueTime);
      setComments(comments);
      setPriority(priority);
      // setAttachments(attachments);
      setParticipants(participants);
      setLabels(labels);
    }
  }, [taskId, isLoading]);
  return (
    <Dialog
      open={taskId !== null}
      onOpenChange={() => {
        resetState();
        window.history.replaceState(null, "", `/workspaces/${workspaceId}`);
      }}
    >
      <DialogContent className="p-0 w-4/5 h-[80%]">
        {isLoading && <TaskDetailsDialogSkeleton />}
        {!isLoading && (
          <div className="w-full flex flex-row">
            <div className="w-1/2 p-4 space-y-2">
              <Title />
              <Assignees />
              <Priority />
              <Column />
              <Labels />
              <Deadlines />
              <Description />
              <Button
                className="w-full bg-green-700"
                onClick={handleUpdateClick}
                disabled={isLoading || isLoadingUpdate}
              >
                {!isLoading && !isLoadingUpdate ? "update task" : "loading ..."}
              </Button>
            </div>
            <div className="w-1/2 p-4 bg-[#FBFAF8]">
              <Tabs defaultValue="account" className="w-full h-[95%]">
                <TabsList className="w-full">
                  <TabsTrigger
                    value="account"
                    className="w-1/2 capitalize data-[state=active]:bg-[#63AA7E]"
                  >
                    comments
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="w-1/2 capitalize data-[state=active]:bg-[#63AA7E]"
                  >
                    activity
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="h-full">
                  <CommentContainer>
                    <CommentContainer.AddCommentLocal />
                  </CommentContainer>
                </TabsContent>
                <TabsContent value="password">coming soon</TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
