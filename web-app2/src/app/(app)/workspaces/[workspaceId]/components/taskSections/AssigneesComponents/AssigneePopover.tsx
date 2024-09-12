"use client";
import React, { ReactNode, Suspense, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetWorkspaceParticipantsById } from "@/utils/hooks/workspace/useGetWorkspaceParticipantsById";
import AddAssignee from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddAssignee";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { WorkspaceParticipants } from "@/utils/@types/workspace";

AssigneePopover.propTypes = {};

function AssigneePopover({
  children,
  data,
}: {
  children: ReactNode;
  data: WorkspaceParticipants[];
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[999] min-w-max">
        <div
          className="space-y-2 max-h-96 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h4 className="capitalize font-bold">workspace participants</h4>
          {data &&
            data.map((item, index) => {
              return (
                <React.Fragment key={item._id}>
                  <AddAssignee data={item} />
                  {index !== data?.length - 1 && <hr />}
                </React.Fragment>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AssigneePopover;
