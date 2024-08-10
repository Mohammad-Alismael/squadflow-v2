import React, { Suspense } from "react";
// import {
//   getWorkspacePrivilege,
//   handleGetTaskById,
// } from "@/utils/actions/workspace-actions";
import { TaskResponse } from "@/utils/@types/task";
import TaskDialogWrapper from "@/components/Dialogs/TaskDialogWrapper";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlainCommentsContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/PlainCommentsContainer";
import { USER_ROLES } from "@/utils/helper-client";
import AddCommentBar from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/AddCommentBar";
import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import { Skeleton } from "@/components/ui/skeleton";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import UpdateTaskBtn from "@/components/Dialogs/components/UpdateTaskBtn";
import { getTaskIdPopulated } from "@/lib/tasks";
import { ObjectId } from "mongodb";
import { getUserAuthFromJWT } from "@/utils/helper";
import Workspace from "@/models/workspace";

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
      <Suspense key={`assignees-${workspaceId}`} fallback={<p>loading ...</p>}>
        <Assignees workspaceId={workspaceId} />
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
        <Labels workspaceId={workspaceId} />
      </Suspense>
      <Deadlines />
      <Description />
      <UpdateTaskBtn workspaceId={workspaceId} />
    </React.Fragment>
  );
}
const handleGetTaskById = async (taskId: string | undefined) => {
  try {
    if (!taskId || taskId === "") return null;
    const task = await getTaskIdPopulated(new ObjectId(taskId));
    return task as TaskResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getWorkspacePrivilege = async (workspaceId: string) => {
  try {
    const { _id: userId, communityId } = await getUserAuthFromJWT();
    const result = await Workspace.aggregate([
      { $match: { _id: new ObjectId(workspaceId) } },
      { $unwind: "$participants" },
      { $match: { "participants.user": new ObjectId(userId) } },
      { $project: { _id: 0, role: "$participants.role" } },
    ]);
    if (result.length === 0) {
      return null; // No matching participant found
    }

    return result[0].role;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string; taskId: string };
  searchParams?: { [key: string]: string };
}) {
  if (!params.workspaceId) throw new Error("no workspace id");
  if (!params.taskId) throw new Error("no task id");
  const roleP = getWorkspacePrivilege(params.workspaceId);
  const data_ = handleGetTaskById(params.taskId);
  const [data, role] = (await Promise.all([data_, roleP])) as [
    TaskResponse,
    string
  ];

  return (
    <TaskDialogWrapper
      data={JSON.parse(JSON.stringify(data))}
      taskId={params.taskId}
      workspaceId={params.workspaceId}
    >
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4 space-y-2">
            <Body
              workspaceId={params.workspaceId}
              revertBackTo={`workspaces/${params.workspaceId}`}
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
                workspaceId={params.workspaceId}
                revertBackTo={`workspaces/${params.workspaceId}`}
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

export default Page;