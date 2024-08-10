import React, { Suspense } from "react";
import PropTypes from "prop-types";
import CreateTaskDialogWrapper from "@/components/Dialogs/CreateTaskDialogWrapper";
import { DialogContent } from "@/components/ui/dialog";
import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import { Skeleton } from "@/components/ui/skeleton";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import CreateTaskBtn from "@/components/Dialogs/components/CreateTaskBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";

Page.propTypes = {};

function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string; columnId: string };
  searchParams?: { [key: string]: string };
}) {
  return (
    <CreateTaskDialogWrapper
      workspaceId={params.workspaceId}
      columnId={params.columnId}
    >
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Title />
            <Suspense
              key={`assignees-${params.workspaceId}`}
              fallback={<p>loading ...</p>}
            >
              <Assignees workspaceId={params.workspaceId as string} />
            </Suspense>
            <Priority />
            <Suspense
              key={`column-${params.workspaceId}`}
              fallback={<Skeleton className="h-10 w-40" />}
            >
              <Column workspaceId={params.workspaceId as string} />
            </Suspense>
            <Suspense
              key={`labels-${params.workspaceId}`}
              fallback={<Skeleton className="h-10 w-40" />}
            >
              <Labels workspaceId={params.workspaceId as string} />
            </Suspense>
            <Deadlines />
            <Description />
            <CreateTaskBtn
              workspaceId={params.workspaceId}
              columnId={params.columnId}
            />
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
        <p>hi</p>
        {/*<Tabs defaultValue="overview" className="w-full">*/}
        {/*  <TabsList className="w-full">*/}
        {/*    <TabsTrigger*/}
        {/*        value="overview"*/}
        {/*        className="w-1/3 capitalize data-[state=active]:bg-[#63AA7E]"*/}
        {/*    >*/}
        {/*      overview*/}
        {/*    </TabsTrigger>*/}
        {/*    <TabsTrigger*/}
        {/*        value="comments"*/}
        {/*        className="w-1/3 capitalize data-[state=active]:bg-[#63AA7E]"*/}
        {/*    >*/}
        {/*      comments*/}
        {/*    </TabsTrigger>*/}
        {/*    <TabsTrigger*/}
        {/*        value="activity"*/}
        {/*        className="w-1/3 capitalize data-[state=active]:bg-[#63AA7E]"*/}
        {/*    >*/}
        {/*      activity*/}
        {/*    </TabsTrigger>*/}
        {/*  </TabsList>*/}
        {/*  <TabsContent value="overview" className="p-4 h-full">*/}
        {/*    <div className="space-y-2 w-full">*/}
        {/*      <Body workspaceId={workspaceId} revertBackTo={revertBackTo} />*/}
        {/*    </div>*/}
        {/*  </TabsContent>*/}
        {/*  <TabsContent value="comments" className="h-full">*/}
        {/*    <div className="relative flex flex-col items-center justify-between">*/}
        {/*      <PlainCommentsContainer />*/}
        {/*      {role !== USER_ROLES.viewer && <AddCommentBar />}*/}
        {/*    </div>*/}
        {/*  </TabsContent>*/}
        {/*  <TabsContent value="activity" className="h-full">*/}
        {/*    coming soon*/}
        {/*  </TabsContent>*/}
        {/*</Tabs>*/}
      </DialogContent>
    </CreateTaskDialogWrapper>
  );
}

export default Page;
