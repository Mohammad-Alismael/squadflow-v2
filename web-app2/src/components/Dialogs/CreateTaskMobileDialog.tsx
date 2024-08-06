"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import { Button } from "@/components/ui/button";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import CommentContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/CommentContainer";
import { useParams } from "next/navigation";
import { useCreateTask } from "@/utils/hooks/task/useCreateTask";
import { useToast } from "@/components/ui/use-toast";
import { revalidateURL } from "@/components/Dialogs/actions";
import { useQueryClient } from "react-query";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { getErrorMessage } from "@/utils/helper-client";

function CreateTaskMobileDialog({ columnId }: { columnId: string }) {
  const { toast } = useToast();
  const { workspaceId } = useParams();
  const {
    mutate: createMutation,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useCreateTask(workspaceId as string);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const reset = useTaskPropertiesStore((state) => state.resetState);
  const setProjectId = useTaskPropertiesStore((state) => state.setProjectId);
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
    if (!isError && isSuccess) {
      setOpen(false);
      reset();
    }

    if (isError) toast({ title: getErrorMessage(error) });
  };
  useEffect(() => {
    workspaceId && setProjectId(workspaceId as string);
  }, [workspaceId]);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-700">+ task card</Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-4/5 h-[80%]">
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
              <Button
                className="w-full bg-green-700"
                onClick={handleCreateTask}
                disabled={isLoading}
              >
                {!isLoading ? "create task" : "loading ..."}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="comments" className="h-full">
            <CommentContainer>
              <CommentContainer.AddCommentLocal />
            </CommentContainer>
          </TabsContent>
          <TabsContent value="activity" className="h-full">
            coming soon
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskMobileDialog;
