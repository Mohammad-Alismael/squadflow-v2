import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { clsx } from "clsx";
import ModifyColumnsDialog from "@/components/Dialogs/ModifyColumnsDialog";
import TasksSearch from "@/app/(app)/workspaces/[workspaceId]/components/TasksSearch";

import { USER_ROLES } from "@/utils/helper-client";
import { Skeleton } from "@/components/ui/skeleton";

WorkspaceHeader.propTypes = {};

async function WorkspaceHeader({
  workspaceId,
  role,
  className,
}: {
  workspaceId: string;
  role: string;
  className: string;
}) {
  return (
    <div
      className={clsx(
        "w-full flex gap-2 items-center justify-between pb-3 md:pb-0",
        className
      )}
    >
      <TasksSearch workspaceId={workspaceId} />
      <div className="flex flex-row items-center justify-between gap-2">
        {role !== USER_ROLES.viewer && (
          <Suspense fallback={<Skeleton className="w-[180px] h-8" />}>
            <ModifyColumnsDialog workspaceId={workspaceId}>
              <Button className="capitalize bg-green-800" size="sm">
                modify columns
              </Button>
            </ModifyColumnsDialog>
          </Suspense>
        )}
        {role === USER_ROLES.admin && (
          <WorkspaceMenu workspaceId={workspaceId} />
        )}
      </div>
    </div>
  );
}

export default WorkspaceHeader;
