import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AddLabelPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/AddLabelPopover";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { WorkspaceLabel } from "@/utils/@types/workspace";

LabelsPopover.propTypes = {};

function LabelsPopover({
  children,
  data,
}: {
  children: ReactNode;
  data: WorkspaceLabel[];
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="capitalize font-bold">workspace labels</h4>
          <div className="py-2">
            {data &&
              data.map((item, index) => {
                return <Label key={item._id.toString()} data={item} />;
              })}
            {!data.length && <p>no label were created for workspace</p>}
          </div>
          <AddLabelPopover>
            <AddItem title="add label" />
          </AddLabelPopover>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LabelsPopover;
