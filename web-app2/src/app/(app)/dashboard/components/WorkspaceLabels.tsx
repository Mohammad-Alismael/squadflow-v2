import React from "react";
import Label from "@/components/Label";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";

async function WorkspaceLabels() {
  const data: IWorkspace[] = await fetchWorkspaces();
  return (
    <div className="w-full flex flex-row gap-2 overflow-x-auto overflow-y-hidden">
      {data.map((item) => (
        <Label
          key={item._id?.toString()}
          id={item._id?.toString() as string}
          text={item.title as string}
        />
      ))}
    </div>
  );
}

export default WorkspaceLabels;
