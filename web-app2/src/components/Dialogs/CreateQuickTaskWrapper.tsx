"use client";
import React, { useEffect, useState } from "react";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { Dialog, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/utils/store/DialogStore";
import { shallow } from "zustand/shallow";

function CreateQuickTaskWrapper({ children }: { children: React.ReactNode[] }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const resetState = useTaskPropertiesStore((state) => state.resetState);

  const open = useDialog((state) => state.isOpen, shallow);
  const setOpen = useDialog((state) => state.open);
  useEffect(() => {
    resetState();
  }, [resetState]);
  return (
    <Dialog
      open={open}
      onOpenChange={(event) => {
        !event && resetState();
        setOpen(event);
        // redirectServer(workspaceId);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-700"
          // onClick={() => setOpen(true)}
        >
          + Task
        </Button>
      </DialogTrigger>
      <DialogOverlay>{isDesktop ? children[0] : children[1]}</DialogOverlay>
    </Dialog>
  );
}

export default CreateQuickTaskWrapper;
