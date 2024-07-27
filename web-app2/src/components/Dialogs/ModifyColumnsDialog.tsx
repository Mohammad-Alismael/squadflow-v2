"use client";
import React, { ReactNode, Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DndColumnContainer from "@/components/Dialogs/components/DNDColumnContainer";
import CreateNewColumnForm from "@/components/Dialogs/components/CreateNewColumnForm";
import { useGetWorkspaceById } from "@/utils/hooks/workspace/useGetWorkspaceById";
function ModifyColumnsDialog({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {isLoading && (
        <DialogContent className="">
          <p>loading ...</p>
        </DialogContent>
      )}
      {!isLoading && workspace && (
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
