"use client";
import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

function TaskDetailsDialog({ workspaceId }: { workspaceId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("taskId");
  return (
    <Dialog
      open={taskId !== null}
      onOpenChange={() =>
        window.history.replaceState(null, "", `/workspaces/${workspaceId}`)
      }
    >
      <DialogContent className="p-0 w-4/5 h-[80%]">
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-4">
            <div>
              <Label>proity</Label>
            </div>
          </div>
          <div className="w-1/2 p-4 bg-[#F2F0EB]">
            <p className="">part 2</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
