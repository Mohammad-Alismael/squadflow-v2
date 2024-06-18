"use client";
import React, { ReactNode, useState } from "react";
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

function CreateTaskDialog({ columnId }: { columnId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { workspaceId } = useParams();
  const {
    mutate: createMutation,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useCreateTask();
  const [open, setOpen] = useState(false);

  const reset = useTaskPropertiesStore((state) => state.resetState);
  const handleCreateTask = () => {
    const {
      taskId,
      title,
      description,
      taskDate,
      endTime,
      column,
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
    if (!isError) {
      toast({
        title: `successfully created task`,
      });

      revalidateURL(workspaceId as string);
      setOpen(false);
      reset();
    }

    if (isError) toast({ title: error });
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-700">+ task card</Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-4/5 h-[80%]">
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
              onClick={handleCreateTask}
              disabled={isLoading}
            >
              {!isLoading ? "create task" : "loading ..."}
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
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
