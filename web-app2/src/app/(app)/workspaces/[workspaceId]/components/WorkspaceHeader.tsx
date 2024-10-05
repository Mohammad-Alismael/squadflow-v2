import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { clsx } from "clsx";
import ModifyColumnsDialog from "@/components/Dialogs/ModifyColumnsDialog";
import TasksSearch from "@/app/(app)/workspaces/[workspaceId]/components/TasksSearch";

import { USER_ROLES } from "@/utils/helper-client";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";

WorkspaceHeader.propTypes = {};

async function WorkspaceHeader({
  workspaceId,
  className,
}: {
  workspaceId: string;
  className: string;
}) {
  const role = await getWorkspacePrivilege(workspaceId);
  return (
    <div
      className={clsx(
        "w-full flex gap-x-2 items-start justify-between",
        className
      )}
    >
      <TasksSearch workspaceId={workspaceId} />
      <div className="flex flex-row items-center justify-between gap-2">
        {role !== USER_ROLES.viewer && (
          <Suspense fallback={<Skeleton className="w-[180px] h-8" />}>
            <ModifyColumnsDialog workspaceId={workspaceId}>
              <Button className="capitalize bg-green-800 h-[2.25rem]" size="sm">
                modify columns
              </Button>
            </ModifyColumnsDialog>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default WorkspaceHeader;
