"use client";
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
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
import { useGetWorkspacePrivilege } from "@/utils/hooks/workspace/useGetWorkspacePrivilege";
import { getRoleValue, USER_ROLES } from "@/utils/helper";

function TaskDetailsDialog({
  workspaceId,
  revertBackTo,
}: {
  workspaceId: string;
  revertBackTo: string;
}) {
  const queryClient = useQueryClient();
  const { data: role, isLoading: isLoadingPrivilege } =
    useGetWorkspacePrivilege(workspaceId);

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
    if (!isError) {
      toast({
        title: `successfully updated task`,
      });

      revalidateURL(workspaceId as string);
      window.history.replaceState(null, "", revertBackTo);
    } else toast({ title: error });
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
      setTaskId(_id);
      setProjectId(workspaceId);
      setColumnId(columnId);
      setDescription(description);
      setTitle(title);
      setTaskDate(dueDate);
      setEndTime(dueTime);
      setComments(comments);
      setPriority(priority);
      setParticipants(participants);
      setLabels(labels);
    }
  }, [isLoading, JSON.stringify(data), workspaceId, taskId]);
  return (
    <Dialog
      open={taskId !== null}
      onOpenChange={() => {
        resetState();
        window.history.replaceState(null, "", revertBackTo);
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
              {!isLoadingPrivilege && role !== getRoleValue(USER_ROLES.viewer) && (
                <Button
                  className="w-full bg-green-700"
                  onClick={handleUpdateClick}
                  disabled={isLoading || isLoadingUpdate}
                >
                  {!isLoading && !isLoadingUpdate
                    ? "update task"
                    : "loading ..."}
                </Button>
              )}
            </div>
            <div className="w-1/2 h-full p-4 bg-[#FBFAF8]">
              <Tabs defaultValue="account" className="w-full">
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
                    <CommentContainer.AddCommentLocal userRole={role} />
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
