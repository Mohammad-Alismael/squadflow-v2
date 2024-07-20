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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DndColumnContainer from "@/components/Dialogs/components/DNDColumnContainer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CreateNewColumnForm from "@/components/Dialogs/components/CreateNewColumnForm";
function ModifyColumnsDialog({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="capitalize">modify columns</DialogTitle>
          <DialogDescription>
            Make changes to your columns here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Suspense fallback={<p>Loading...</p>}>
            <DndColumnContainer workspaceId={workspaceId} />
          </Suspense>
          <CreateNewColumnForm />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModifyColumnsDialog;
