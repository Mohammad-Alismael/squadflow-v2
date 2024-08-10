"use client";
import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AssigneePopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AssigneePopover";
import ShowAssignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/showAssignees";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { useShallow } from "zustand/react/shallow";
import { WorkspaceParticipants } from "@/utils/@types/workspace";
async function AssigneesClient() {
  const { participants } = useTaskPropertiesStore(
    useShallow((state) => ({
      participants: state.workspaceParticipants,
    }))
  );
  return (
    <div className="flex items-center gap-3.5">
      <h3 className="font-bold">assignees</h3>
      <ShowAssignees />
      <AssigneePopover
        data={participants as unknown as WorkspaceParticipants[]}
      >
        <AddItem title="add participant" />
      </AssigneePopover>
    </div>
  );
}

export default AssigneesClient;
