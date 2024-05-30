"use client";
import React, { ReactNode, useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "lucide-react";
import FindParticipantsDialog from "@/components/Dialogs/FindParticipantsDialog";
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";

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
  const [isLoading, setIsLoading] = useState(false);
  const joinedParticipants = workspaceParticipantStore(
    (state) => state.participants
  );

  useEffect(() => {
    form.setValue("participants", joinedParticipants);
  }, [JSON.stringify(joinedParticipants)]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await handleCreateWorkspace(values);
    setIsLoading(false);
    setOpen(false);
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="capitalize">create workspace</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
                    <div className="mt-4 flex items-center gap-2">
                      {joinedParticipants.map((item) => {
                        return (
                          <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback>{item.user}</AvatarFallback>
                          </Avatar>
                        );
                      })}
                      <FindParticipantsDialog>
                        <div className="bg-gray-200 rounded-full p-2">
                          <PlusIcon className="h-6 w-6" />
                        </div>
                      </FindParticipantsDialog>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="bg-green-700">
              {isLoading ? "loading ..." : "submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkspaceDialog;
