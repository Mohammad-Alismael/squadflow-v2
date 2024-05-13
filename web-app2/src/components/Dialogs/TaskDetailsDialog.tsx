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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { handleCreateWorkspace } from "@/app/(app)/workspaces/actions";
import { Label } from "@/components/ui/label";

function TaskDetailsDialog({ children }: { children: React.ReactNode }) {
  const formSchema = z.object({
    title: z.string().min(4).max(50),
    participants: z.array(
      z
        .object({
          user: z.string(),
          role: z.enum(["admin", "editor", "viewer"]),
        })
        .refine((value) => ["admin", "editor", "viewer"].includes(value.role), {
          message: "role should be either admin or editor or viewer",
        })
    ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      participants: [],
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const res = await handleCreateWorkspace(values);
    // console.log(res);
    // console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
