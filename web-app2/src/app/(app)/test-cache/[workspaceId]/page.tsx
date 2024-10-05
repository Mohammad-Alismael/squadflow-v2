import {
  fetchWorkspace,
  getTasksForWorkspace,
} from "@/utils/actions/workspace-actions";
import React, { Suspense } from "react";
import { ITask, MetaTaskResponse } from "@/utils/@types/task";
import { IWorkspace } from "@/utils/@types/workspace";

async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  const tabs = searchParams && searchParams["tabs"];
  const workspaceData = await fetchWorkspace(params.workspaceId);
  // const workspaceTasks = getTasksForWorkspace(params.workspaceId);
  //
  // const [data, tasks] = (await Promise.all([
  //   workspaceData,
  //   workspaceTasks,
  // ])) as [IWorkspace, MetaTaskResponse[]];
  console.log(workspaceData);
  if (workspaceData)
    return (
      <div>
        <p>testing cache {params.workspaceId}</p>
        <p>workspace data : {workspaceData.title}</p>
        <Component1 workspaceId={params.workspaceId} />
        {tabs === "1" && <Component1 workspaceId={params.workspaceId} />}
        {tabs === "tasks" && (
          <Suspense fallback={<p>loading tasks ...</p>}>
            <Tasks workspaceId={params.workspaceId} />
          </Suspense>
        )}
        {/*{tabs === "tasks" && (*/}
        {/*  <Suspense fallback={<p>loading tasks ...</p>}>*/}
        {/*    <TasksAccept tasks={tasks} />*/}
        {/*  </Suspense>*/}
        {/*)}*/}
      </div>
    );
}

async function Component1({ workspaceId }: { workspaceId: string }) {
  const workspaceData = await fetchWorkspace(workspaceId);
  return <p>workspace data from comp1 : {workspaceData?.title}</p>;
}

async function Tasks({ workspaceId }: { workspaceId: string }) {
  const workspaceData = await getTasksForWorkspace(workspaceId);
  return <p>workspace tasks : {workspaceData.length}</p>;
}

async function TasksAccept({ tasks }: { tasks: MetaTaskResponse[] }) {
  return <p>workspace tasks : {tasks.length} kosum</p>;
}

export default Page;
