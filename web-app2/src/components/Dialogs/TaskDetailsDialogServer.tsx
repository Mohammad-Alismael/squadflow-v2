import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateTaskBtn from "@/components/Dialogs/components/CreateTaskBtn";
import {
  getWorkspacePrivilege,
  handleGetTaskById,
} from "@/utils/actions/workspace-actions";
import TaskDialogWrapper from "@/components/Dialogs/TaskDialogWrapper";
import { TaskResponse } from "@/utils/@types/task";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import { USER_ROLES } from "@/utils/helper-client";

function Body({
  workspaceId,
  revertBackTo,
}: {
  workspaceId: string;
  revertBackTo: string;
}) {
  return (
    <React.Fragment>
      <Title />
      {/*<Assignees />*/}
      {/*<Priority />*/}
      {/*<Column />*/}
      {/*<Labels />*/}
      <Deadlines />
      <Description />
      <CreateTaskBtn workspaceId={workspaceId} revertBackTo={revertBackTo} />
    </React.Fragment>
  );
}

async function TaskDetailsDialogServer({
  workspaceId,
  taskId,
  revertBackTo,
}: {
  workspaceId: string;
  taskId: string | undefined;
  revertBackTo: string;
}) {
  const roleP = getWorkspacePrivilege(workspaceId);
  const data_ = handleGetTaskById(taskId);
  const [data, role] = (await Promise.all([data_, roleP])) as [
    TaskResponse,
    string
  ];
  return (
    <TaskDialogWrapper
      data={JSON.parse(JSON.stringify(data))}
      taskId={taskId}
      workspaceId={workspaceId}
    >
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Body workspaceId={workspaceId} revertBackTo={revertBackTo} />
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
              <Body workspaceId={workspaceId} revertBackTo={revertBackTo} />
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
