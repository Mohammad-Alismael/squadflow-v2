"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";
import ParticipantsList from "@/components/Dialogs/components/ParticipantsList";
import { useUpdateParticipants } from "@/utils/hooks/updateParticipants";

function CreateWorkspaceDialog() {
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

  const [open, setOpen] = useState(false);
  const joinedParticipants = useUpdateParticipants(form);
  const { reset } = workspaceParticipantStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      form.clearErrors();
      await handleCreateWorkspace(values);
      setOpen(false);
      reset();
    } catch (error) {
      form.setError("root", {
        type: "custom",
        message: error.message,
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          className="capitalize bg-green-800"
          onClick={() => setOpen(true)}
        >
          create workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 sm:w-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">create workspace</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {form.formState.errors.root && (
          <span className="text-red-600">
            {form.formState.errors.root.message}
          </span>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>workspace title</FormLabel>
                  <FormControl>
                    <Input placeholder="workspace name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">participants</FormLabel>
                  <FormControl>
                    <ParticipantsList joinedParticipants={joinedParticipants} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-green-700"
            >
              {form.formState.isSubmitting ? "loading ..." : "submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkspaceDialog;
