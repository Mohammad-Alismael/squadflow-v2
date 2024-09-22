import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import WorkspaceTabs from "@/app/(app)/calendars/components/WorkspaceTabs";
import TaskDetailsDialogServer from "@/components/Dialogs/TaskDetailsDialogServer";
import WorkspaceTabsSkeleton from "@/app/(app)/calendars/components/WorkspaceTabsSkeleton";
import CalendarWrapper from "@/app/(app)/calendars/components/CalendarWrapper";

Page.propTypes = {};

function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  return (
    <div>
      <Navbar>
        <div>
          <p className="text-2xl">calendars</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="w-full h-full flex flex-col flex-grow px-2s rounded space-y-2">
        <Suspense fallback={<WorkspaceTabsSkeleton />}>
          <WorkspaceTabs />
        </Suspense>
        {searchParams && searchParams["workspace"] && (
          <Suspense fallback={<WorkspaceTabsSkeleton />}>
            <CalendarWrapper
              workspaceId={searchParams["workspace"]}
              withRightComponent={true}
            />
          </Suspense>
        )}
      </div>
      {searchParams && searchParams["taskId"] && (
        <TaskDetailsDialogServer
          taskId={searchParams["taskId"]}
          workspaceId={searchParams["workspace"]}
        />
      )}
    </div>
  );
}

export default Page;
