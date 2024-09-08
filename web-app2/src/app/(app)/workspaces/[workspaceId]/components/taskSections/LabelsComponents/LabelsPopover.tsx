import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AddLabelPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/AddLabelPopover";
import ShowLabelsClient from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/ShowLabelsClient";

LabelsPopover.propTypes = {};

function LabelsPopover({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="capitalize font-bold">workspace labels</h4>
          <ShowLabelsClient workspaceId={workspaceId} />
          <AddLabelPopover>
            <AddItem title="add label" />
          </AddLabelPopover>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LabelsPopover;
