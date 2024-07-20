import React, { useEffect } from "react";
import { fetchWorkspace } from "@/utils/actions/workspace-actions";
import DNDColumn from "@/components/Dialogs/components/DNDColumn";
import { WorkspaceColumn } from "@/utils/@types/workspace";

async function DndColumnContainer({ workspaceId }: { workspaceId: string }) {
  const workspace = await fetchWorkspace(workspaceId);
  return (
    <div className="grid gap-2 py-4">
      {workspace.columns.map((column: WorkspaceColumn) => (
        <DNDColumn key={column._id} data={column} />
      ))}
    </div>
  );
}

export default DndColumnContainer;
