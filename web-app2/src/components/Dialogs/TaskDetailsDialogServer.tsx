import React, { Suspense } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateTaskBtn from "@/components/Dialogs/components/UpdateTaskBtn";
import {
  getWorkspacePrivilege,
  handleGetTaskById,
} from "@/utils/actions/workspace-actions";
import TaskDialogWrapper from "@/components/Dialogs/TaskDialogWrapper";
import { TaskResponse } from "@/utils/@types/task";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import { USER_ROLES } from "@/utils/helper-client";
import { Skeleton } from "@/components/ui/skeleton";

function Body({
  workspaceId,
  showAddBtn,
}: {
  workspaceId: string;
  showAddBtn: boolean;
}) {
  console.log("why", { showAddBtn });
  return (
    <React.Fragment>
      <Title />
      <Suspense key={`assignees-${workspaceId}`} fallback={<p>loading ...</p>}>
        <Assignees workspaceId={workspaceId} showAddBtn={showAddBtn} />
      </Suspense>
      <Priority />
      <Suspense
        key={`column-${workspaceId}`}
        fallback={<Skeleton className="h-10 w-40" />}
      >
        <Column workspaceId={workspaceId} />
      </Suspense>
      <Suspense
        key={`labels-${workspaceId}`}
        fallback={<Skeleton className="h-10 w-40" />}
      >
        <Labels workspaceId={workspaceId} showAddBtn={showAddBtn} />
      </Suspense>
      <Deadlines />
      <Description />
      <UpdateTaskBtn workspaceId={workspaceId} />
    </React.Fragment>
  );
}
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function TaskDetailsDialogServer({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string | undefined;
}) {
  const roleP = getWorkspacePrivilege(workspaceId);
  const data_ = handleGetTaskById(taskId);
  const [data, role] = (await Promise.all([data_, roleP])) as [
    TaskResponse,
    string
  ];
  console.log({ data: JSON.parse(JSON.stringify(data)), role });
  return (
    <TaskDialogWrapper
      data={JSON.parse(JSON.stringify(data))}
      taskId={taskId}
      workspaceId={workspaceId}
    >
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Body
              workspaceId={workspaceId}
              showAddBtn={role !== USER_ROLES.viewer}
            />
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
                <div className="relative flex flex-col items-center justify-between">
                  <PlainCommentsContainer />
                  {role !== USER_ROLES.viewer && <AddCommentBar />}
                </div>
              </TabsContent>
              <TabsContent value="password">coming soon</TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
      <DialogContent className="p-0 w-4/5">
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
              <Body
                workspaceId={workspaceId}
                showAddBtn={role !== USER_ROLES.viewer}
              />
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
    </TaskDialogWrapper>
  );
}

export default TaskDetailsDialogServer;
