"use client";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import { Button } from "@/components/ui/button";

function CreateTaskDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4">
            <Title />
            <Button className="w-full bg-green-700">create task</Button>
          </div>
          <div className="w-1/2 p-4 bg-[#F2F0EB]">
            <p className="">part 2</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
