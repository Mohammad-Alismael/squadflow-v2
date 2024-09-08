import React from "react";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import LabelsPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/LabelsPopover";
import ShowLabels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/ShowLabels";
import { getWorkspaceLabels } from "@/utils/actions/workspace-actions";

async function Labels({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="w-full flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-10">
        <h3 className="font-bold">labels</h3>
        <div className="flex flex-wrap items-center gap-2">
          <ShowLabels />
        </div>
      </div>
      <LabelsPopover workspaceId={workspaceId}>
        <AddItem title="add" />
      </LabelsPopover>
    </div>
  );
}

export default Labels;
