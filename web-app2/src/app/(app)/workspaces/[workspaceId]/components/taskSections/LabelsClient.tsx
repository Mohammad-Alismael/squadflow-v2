"use client";
import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import LabelsPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/LabelsPopover";
import ShowLabels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/ShowLabels";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { useShallow } from "zustand/react/shallow";
import { WorkspaceLabel } from "@/utils/@types/workspace";

function LabelsClient() {
  const { labels, projectId } = useTaskPropertiesStore(
    useShallow((state) => ({
      labels: state.workspaceLabels,
      projectId: state.projectId,
    }))
  );
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-10">
        <h3 className="font-bold">labels</h3>
        <div className="flex items-center gap-2">
          <ShowLabels />
        </div>
      </div>
      <LabelsPopover workspaceId={projectId}>
        <AddItem title="add" />
      </LabelsPopover>
    </div>
  );
}

export default LabelsClient;
