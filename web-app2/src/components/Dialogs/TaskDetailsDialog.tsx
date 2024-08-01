"use client";
import React, { useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { useGetWorkspacePrivilege } from "@/utils/hooks/workspace/useGetWorkspacePrivilege";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import TaskDetailsMobileDialog from "@/components/Dialogs/TaskDetailsMobileDialog";
import { getRoleValue, USER_ROLES } from "@/utils/helper-client";

function TaskDetailsDialog({
  workspaceId,
  revertBackTo,
}: {
  workspaceId: string;
  revertBackTo: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId") as string;
  const { data: role, isLoading: isLoadingPrivilege } =
    useGetWorkspacePrivilege(workspaceId);
  const { isLoading } = useGetTasksById(workspaceId, taskId);

  const resetState = useTaskPropertiesStore((state) => state.resetState);
  const {
    mutate: updateMutation,
    isLoading: isLoadingUpdate,
    error,
    isError,
    isSuccess,
  } = useUpdateTask(workspaceId, revertBackTo);

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
  const onOpenChange = useCallback(() => {
    resetState();
    window.history.replaceState(null, "", revertBackTo);
  }, [resetState, revertBackTo]);

  if (isError) {
    throw error; // This will be caught by the error boundary
  }

  if (isDesktop)
    return (
      <Dialog open={taskId !== null} onOpenChange={onOpenChange}>
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
                {!isLoadingPrivilege &&
                  role !== getRoleValue(USER_ROLES.viewer) && (
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
  else
    return (
      <TaskDetailsMobileDialog
        workspaceId={workspaceId}
        revertBackTo={revertBackTo}
      />
    );
}

export default TaskDetailsDialog;
