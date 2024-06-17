"use client";
import React, { ReactNode, Suspense } from "react";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetWorkspaceParticipantsById } from "@/utils/hooks/workspace/useGetWorkspaceParticipantsById";
import { useParams } from "next/navigation";
import AddAssignee from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/AssigneesComponents/AddAssignee";

AssigneePopover.propTypes = {};

function AssigneePopover({ children }: { children: ReactNode }) {
  const { workspaceId } = useParams();
  const { data, isLoading } = useGetWorkspaceParticipantsById(
    workspaceId as string,
    true,
    true
  );
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent>
        {isLoading && <p>loading ...</p>}
        <div className="space-y-2">
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
