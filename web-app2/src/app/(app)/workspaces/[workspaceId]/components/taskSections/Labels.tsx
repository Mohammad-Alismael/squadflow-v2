import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import LabelsPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/LabelsPopover";
import ShowLabels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/ShowLabels";

function Labels() {
  return (
    <div className="flex items-center gap-10">
      <h3 className="font-bold">labels</h3>
      <div className="flex items-center gap-2">
        <ShowLabels />
        <LabelsPopover>
          <AddItem title="add" />
        </LabelsPopover>
      </div>
    </div>
  );
}

export default Labels;
