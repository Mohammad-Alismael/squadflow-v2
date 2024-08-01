import React from "react";
import { Button } from "@/components/ui/button";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clsx } from "clsx";
import ModifyColumnsDialog from "@/components/Dialogs/ModifyColumnsDialog";
import TasksSearch from "@/app/(app)/workspaces/[workspaceId]/components/TasksSearch";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";

import { USER_ROLES } from "@/utils/helper-client";

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
        "w-full flex flex-row items-center justify-between",
        className
      )}
    >
      <TasksSearch workspaceId={workspaceId} />
      <div className="flex flex-row items-center justify-between gap-2">
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="group by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="alphabticaly">A-Z</SelectItem>
            <SelectItem value="accedning">latest to oldest</SelectItem>
            <SelectItem value="decending">oldest to latest</SelectItem>
          </SelectContent>
        </Select>
        {role !== USER_ROLES.viewer && (
          <ModifyColumnsDialog workspaceId={workspaceId}>
            <Button className="capitalize bg-green-800">modify columns</Button>
          </ModifyColumnsDialog>
        )}
        {role === USER_ROLES.admin && (
          <WorkspaceMenu workspaceId={workspaceId} />
        )}
      </div>
    </div>
  );
}

export default WorkspaceHeader;
