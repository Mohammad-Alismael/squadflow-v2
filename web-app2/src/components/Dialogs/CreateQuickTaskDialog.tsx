import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import CreateQuickTaskBtn from "@/components/Dialogs/components/CreateQuickTaskBtn";
import ColumnInternal from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/ColumnInternal";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import WorkspaceServer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/WorkspaceServer";
import { Skeleton } from "@/components/ui/skeleton";
import AssigneesClient from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesClient";
import LabelsClient from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsClient";
import CreateQuickTaskWrapper from "@/components/Dialogs/CreateQuickTaskWrapper";

const Body = () => {
  return (
    <React.Fragment>
      <Title />
      <Suspense fallback={<Skeleton className="h-10 w-40" />}>
        <WorkspaceServer />
      </Suspense>
      <AssigneesClient />
      <Priority />
      <ColumnInternal />
      <LabelsClient />
      <Deadlines />
      <Description />
      <CreateQuickTaskBtn />
    </React.Fragment>
  );
};

function CreateQuickTaskDialog() {
  return (
    <CreateQuickTaskWrapper>
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Body />
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
              <Body />
            </div>
          </TabsContent>
          <TabsContent value="comments" className="h-full">
            <div className="relative flex flex-col items-center justify-between">
              <PlainCommentsContainer />
              <AddCommentBar />
            </div>
          </TabsContent>
          <TabsContent value="activity" className="h-full">
            coming soon
          </TabsContent>
        </Tabs>
      </DialogContent>
    </CreateQuickTaskWrapper>
  );
}

export default CreateQuickTaskDialog;
