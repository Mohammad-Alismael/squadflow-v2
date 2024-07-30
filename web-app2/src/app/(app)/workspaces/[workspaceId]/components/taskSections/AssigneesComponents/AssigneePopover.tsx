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

AssigneePopover.propTypes = {};

function AssigneePopover({ children }: { children: ReactNode }) {
  const workspaceId = useTaskPropertiesStore((state) => state.projectId);
  const { data, isLoading } = useGetWorkspaceParticipantsById(
    workspaceId,
    true
  );

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[999]">
        {isLoading && <p>loading ...</p>}
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <h4 className="capitalize font-bold">workspace participants</h4>
          {!isLoading &&
            data &&
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
