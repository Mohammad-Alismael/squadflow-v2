import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import LabelsPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/LabelsPopover";
import ShowLabels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/ShowLabels";

async function Labels({
  workspaceId,
  showAddBtn = true,
}: {
  workspaceId: string;
  showAddBtn: boolean;
}) {
  return (
    <div className="w-full flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-10">
        <h3 className="font-bold">labels</h3>
        <div className="flex flex-wrap items-center gap-2">
          <ShowLabels showDeleteIcon={showAddBtn} />
        </div>
      </div>
      {showAddBtn && (
        <LabelsPopover workspaceId={workspaceId} showAddLabelDialog={true}>
          <AddItem title="add" />
        </LabelsPopover>
      )}
    </div>
  );
}

export default Labels;
