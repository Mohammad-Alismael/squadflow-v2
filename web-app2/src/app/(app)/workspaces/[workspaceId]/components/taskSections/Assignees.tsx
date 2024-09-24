import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AssigneePopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AssigneePopover";
import ShowAssignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/showAssignees";
import { fetchWorkspaceParticipants } from "@/utils/actions/workspace-actions";
async function Assignees({
  workspaceId,
  showAddBtn = true,
}: {
  workspaceId: string;
  showAddBtn: boolean;
}) {
  const data = await fetchWorkspaceParticipants(workspaceId, true);
  return (
    <div className="flex flex-wrap items-center gap-1">
      <h3 className="font-bold">assignees</h3>
      <ShowAssignees />
      {showAddBtn && (
        <AssigneePopover data={JSON.parse(JSON.stringify(data))}>
          <AddItem title="add participant" />
        </AssigneePopover>
      )}
    </div>
  );
}

export default Assignees;
