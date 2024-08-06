import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AssigneePopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AssigneePopover";
import ShowAssignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/showAssignees";
import { getUserAuthFromJWT } from "@/utils/helper";
import { getWorkspaceById, getWorkspaceParticipants } from "@/lib/workspace";
import { ObjectId } from "mongodb";
import { PopulatedUser } from "@/utils/@types/user";
import { WorkspaceParticipants } from "@/utils/@types/workspace";
import { fetchWorkspaceParticipants } from "@/utils/actions/workspace-actions";
async function Assignees({ workspaceId }: { workspaceId: string }) {
  const data = await fetchWorkspaceParticipants(workspaceId, true);
  console.log(data, { workspaceId });
  return (
    <div className="flex items-center gap-3.5">
      <h3 className="font-bold">assignees</h3>
      <ShowAssignees />
      <AssigneePopover data={JSON.parse(JSON.stringify(data))}>
        <AddItem title="add participant" />
      </AssigneePopover>
    </div>
  );
}

export default Assignees;
