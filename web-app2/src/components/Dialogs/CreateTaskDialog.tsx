import React, { Suspense } from "react";
import { DialogContent } from "@/components/ui/dialog";

import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import { Skeleton } from "@/components/ui/skeleton";
import CreateTaskBtn from "@/components/Dialogs/components/CreateTaskBtn";
import CreateTaskDialogWrapper from "@/components/Dialogs/CreateTaskDialogWrapper";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import { USER_ROLES } from "@/utils/helper-client";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
const Body = ({
  workspaceId,
  columnId,
}: {
  workspaceId: string;
  columnId: string;
}) => {
  return (
    <React.Fragment>
      <Title />
      <Suspense key={`assignees-${workspaceId}`} fallback={<p>loading ...</p>}>
        <Assignees workspaceId={workspaceId as string} />
      </Suspense>
      <Priority />
      <Suspense
        key={`column-${workspaceId}`}
        fallback={<Skeleton className="h-10 w-40" />}
      >
        <Column workspaceId={workspaceId as string} />
      </Suspense>
      <Suspense
        key={`labels-${workspaceId}`}
        fallback={<Skeleton className="h-10 w-40" />}
      >
        <Labels workspaceId={workspaceId as string} />
      </Suspense>
      <Deadlines />
      <Description />
      <CreateTaskBtn workspaceId={workspaceId} columnId={columnId} />
    </React.Fragment>
  );
};
function CreateTaskDialog({
  columnId,
  role,
  workspaceId,
}: {
  columnId: string;
  role: string;
  workspaceId: string;
}) {
  return (
    <CreateTaskDialogWrapper workspaceId={workspaceId} columnId={columnId}>
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Body workspaceId={workspaceId} columnId={columnId} />
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
                <div className="relative flex flex-col items-center justify-between">
                  <PlainCommentsContainer />
                  <AddCommentBar />
                </div>
              </TabsContent>
              <TabsContent value="password">coming soon</TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
      <DialogContent className="p-0 w-4/5">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="">
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
          <TabsContent value="overview" className="p-2 h-full">
            <div className="space-y-2 w-full">
              <Body workspaceId={workspaceId} columnId={columnId} />
            </div>
          </TabsContent>
          <TabsContent value="comments" className="h-full">
            <div className="relative flex flex-col items-center justify-between">
              <PlainCommentsContainer />
              {role !== USER_ROLES.viewer && <AddCommentBar />}
            </div>
          </TabsContent>
          <TabsContent value="activity" className="h-full">
            coming soon
          </TabsContent>
        </Tabs>
      </DialogContent>
    </CreateTaskDialogWrapper>
  );
}

export default CreateTaskDialog;
