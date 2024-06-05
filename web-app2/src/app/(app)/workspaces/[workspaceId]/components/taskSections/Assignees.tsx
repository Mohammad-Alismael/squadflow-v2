import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AssigneePopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AssigneePopover";
import ShowAssignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/showAssignees";
function Assignees() {
  return (
    <div className="flex items-center gap-3.5">
      <h3 className="font-bold">assignees</h3>
      <ShowAssignees />
      <AssigneePopover>
        <AddItem title="add participant" />
      </AssigneePopover>
    </div>
  );
}

export default Assignees;
