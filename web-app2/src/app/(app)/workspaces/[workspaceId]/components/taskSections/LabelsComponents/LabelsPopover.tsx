"use client";
import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";
import { useGetWorkspaceLabelsById } from "@/utils/hooks/workspace/useGetWorkspaceLabelsById";
import AddItem from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddItem";
import AddLabelPopover from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/AddLabelPopover";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

LabelsPopover.propTypes = {};

function LabelsPopover({ children }: { children: ReactNode }) {
  const workspaceId = useTaskPropertiesStore((state) => state.projectId);
  const { data, isLoading } = useGetWorkspaceLabelsById(workspaceId as string);
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        {isLoading && <p>loading ...</p>}
        <div className="space-y-2">
          <h4 className="capitalize font-bold">workspace labels</h4>
          <div className="py-2">
            {!isLoading &&
              data &&
              data.map((item, index) => {
                return <Label key={item._id.toString()} data={item} />;
              })}
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
