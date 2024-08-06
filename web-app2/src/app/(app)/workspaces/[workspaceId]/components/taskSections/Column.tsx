import React from "react";
import { fetchWorkspaceColumns } from "@/utils/actions/workspace-actions";
import SelectColumn from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/SelectColumn";

const Column = async ({ workspaceId }: { workspaceId: string }) => {
  const data = await fetchWorkspaceColumns(workspaceId);

  return (
    <div className="flex flex-row items-center gap-8">
      <h3 className="font-bold">Column</h3>
      <SelectColumn data={JSON.parse(JSON.stringify(data))} />
    </div>
  );
};
export default Column;
