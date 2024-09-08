"use client";
import React from "react";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";
import { useGetWorkspaceLabelsById } from "@/utils/hooks/workspace/useGetWorkspaceLabelsById";

function ShowLabelsClient({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading } = useGetWorkspaceLabelsById(workspaceId);
  if (isLoading) return <p>loading ...</p>;
  if (data)
    return (
      <div className="py-2">
        {data &&
          data.map((item, index) => {
            return <Label key={item._id.toString()} data={item} />;
          })}
        {!data.length && <p>no label were created for workspace</p>}
      </div>
    );
}

export default ShowLabelsClient;
