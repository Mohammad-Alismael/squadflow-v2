import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DndColumnContainer from "@/components/Dialogs/components/DNDColumnContainer";
import CreateNewColumnForm from "@/components/Dialogs/components/CreateNewColumnForm";
import { fetchWorkspace } from "@/utils/actions/workspace-actions";
import { IWorkspace } from "@/utils/@types/workspace";
async function ModifyColumnsDialog({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  const workspaceRaw = (await fetchWorkspace(
    workspaceId
  )) as unknown as IWorkspace;
  const workspace = JSON.parse(JSON.stringify(workspaceRaw));
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {workspace && (
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="capitalize">modify columns</DialogTitle>
            <DialogDescription>
              Make changes to your columns here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <DndColumnContainer columns={workspace.columns ?? []} />
            <CreateNewColumnForm
              workspaceId={workspaceId}
              columnsLength={workspace.columns ? workspace.columns.length : 0}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ModifyColumnsDialog;
