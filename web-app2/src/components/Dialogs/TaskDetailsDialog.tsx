"use client";
import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "react-query";

function TaskDetailsDialog({ workspaceId }: { workspaceId: string }) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("taskId");
  const handleClick = () => {
    console.log(queryClient.getQueryCache());
    // .invalidateQueries([`column-66589458b6eef15a1ac66dc8`])
    // .then((r) => {
    //   console.log("done");
    // });
  };
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
              <Button onClick={handleClick}>update task</Button>
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
