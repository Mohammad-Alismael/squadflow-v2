import React, { ReactNode, Suspense, useEffect, useState } from "react";
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
import CreateTaskMobileDialog from "@/components/Dialogs/CreateTaskMobileDialog";
import Workspace from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Workspace";
import CreateQuickTaskBtn from "@/components/Dialogs/components/CreateQuickTaskBtn";
import ColumnInternal from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/ColumnInternal";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import WorkspaceServer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/WorkspaceServer";
import { Skeleton } from "@/components/ui/skeleton";

function CreateQuickTaskDialog({ children }: { children: React.ReactNode }) {
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  // if (isDesktop)
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Title />
            <Suspense fallback={<Skeleton className="h-10 w-40" />}>
              <WorkspaceServer />
            </Suspense>
            <Assignees />
            <Priority />
            <ColumnInternal />
            <Labels />
            <Deadlines />
            <Description />
            <CreateQuickTaskBtn />
          </div>
          <div className="w-1/2 p-4 bg-[#FBFAF8]">
            <Tabs defaultValue="comments" className="w-full h-[95%]">
              <TabsList className="w-full">
                <TabsTrigger
                  value="comments"
                  className="w-1/2 capitalize data-[state=active]:bg-[#63AA7E]"
                >
                  comments
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="w-1/2 capitalize data-[state=active]:bg-[#63AA7E]"
                >
                  activity
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="h-full">
                <div className="relative flex flex-col items-center justify-between">
                  <PlainCommentsContainer />
                  <AddCommentBar />
                </div>
              </TabsContent>
              <TabsContent value="activity">coming soon</TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateQuickTaskDialog;
