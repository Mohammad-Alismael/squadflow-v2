import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import FullPageCalendar from "@/app/(app)/calendars/components/FullPageCalendar";
import WorkspaceTabs from "@/app/(app)/calendars/components/WorkspaceTabs";
import TaskDetailsDialogServer from "@/components/Dialogs/TaskDetailsDialogServer";
import WorkspaceTabsSkeleton from "@/app/(app)/calendars/components/WorkspaceTabsSkeleton";

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
      <div className="w-full h-full bg-white flex flex-col flex-grow p-4 rounded space-y-2">
        <Suspense fallback={<WorkspaceTabsSkeleton />}>
          <WorkspaceTabs />
        </Suspense>
        <FullPageCalendar />
      </div>
      {searchParams && searchParams["taskId"] && (
        <TaskDetailsDialogServer
          taskId={searchParams["taskId"]}
          workspaceId={searchParams["workspace"]}
          revertBackTo={`/calendars?workspace=${searchParams["workspace"]}`}
        />
      )}
    </div>
  );
}

export default Page;
