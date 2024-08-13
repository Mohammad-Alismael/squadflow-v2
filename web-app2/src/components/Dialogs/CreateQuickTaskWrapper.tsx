"use client";
import React, { useEffect, useState } from "react";
import { TaskResponse } from "@/utils/@types/task";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import { redirectServer } from "@/app/(app)/workspaces/[workspaceId]/actions";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { useDialog } from "@/utils/store/DialogStore";
import { shallow } from "zustand/shallow";

function CreateQuickTaskWrapper({ children }: { children: React.ReactNode[] }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <Dialog>
      <DialogTrigger asChild>{children[0]}</DialogTrigger>
      <DialogOverlay>{isDesktop ? children[1] : children[2]}</DialogOverlay>
    </Dialog>
  );
}

export default CreateQuickTaskWrapper;
