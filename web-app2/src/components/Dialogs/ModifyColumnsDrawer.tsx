import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DndColumnContainer from "@/components/Dialogs/components/DNDColumnContainer";
import CreateNewColumnForm from "@/components/Dialogs/components/CreateNewColumnForm";
import { fetchWorkspace } from "@/utils/actions/workspace-actions";
import { IWorkspace } from "@/utils/@types/workspace";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
async function ModifyColumnsDrawer({
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
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      {workspace && (
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="capitalize">modify columns</DrawerTitle>
            <DrawerDescription>
              Make changes to your columns here.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 py-4">
            <DndColumnContainer columns={workspace.columns ?? []} />
            <CreateNewColumnForm
              workspaceId={workspaceId}
              columnsLength={workspace.columns ? workspace.columns.length : 0}
            />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}

export default ModifyColumnsDrawer;
