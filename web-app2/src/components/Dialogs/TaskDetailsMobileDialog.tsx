"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { handleGetTaskById } from "@/utils/actions/workspace-actions";
import { getTaskById } from "@/lib/api/task";
import { getRoleValue, USER_ROLES } from "@/utils/helper-client";

function TaskDetailsMobileDialog({
  workspaceId,
  revertBackTo,
}: {
  workspaceId: string;
  revertBackTo: string;
}) {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId") as string;
  const [isLoading, setIsLoading] = useState(false);
  const { data: role, isLoading: isLoadingPrivilege } =
    useGetWorkspacePrivilege(workspaceId);

  const resetCustomState = useTaskPropertiesStore(
    (state) => state.resetCustomState
  );
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

  useEffect(() => {
    const foo = async () => {
      const task = await getTaskById(taskId);
      return task;
    };
    setIsLoading(true);
    if (workspaceId && taskId) {
      foo()
        .then((data) => {
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
            projectId: workspaceId,
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [workspaceId, taskId]);
  if (isError) {
    throw error; // This will be caught by the error boundary
  }

  return (
    <Dialog open={taskId !== null} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 w-4/5">
        {isLoading && <TaskDetailsDialogSkeleton />}
        {!isLoading && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger
                value="overview"
                className="w-1/3 capitalize data-[state=active]:bg-[#63AA7E]"
              >
                overview
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="w-1/3 capitalize data-[state=active]:bg-[#63AA7E]"
              >
                comments
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="w-1/3 capitalize data-[state=active]:bg-[#63AA7E]"
              >
                activity
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 h-full">
              <div className="space-y-2 w-full">
                <Title />
                {/*<Assignees />*/}
                <Priority />
                {/*<Column />*/}
                {/*<Labels />*/}
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
            </TabsContent>
            <TabsContent value="comments" className="h-full">
              <CommentContainer>
                <CommentContainer.AddCommentLocal userRole={role} />
              </CommentContainer>
            </TabsContent>
            <TabsContent value="activity" className="h-full">
              coming soon
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsMobileDialog;
