"use client";
import React, { ReactNode, useState } from "react";
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

function CreateWorkspaceDialog({ children }: { children: ReactNode }) {
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
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await handleCreateWorkspace(values);
    setIsLoading(false);
    console.log(res);
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>create workspace</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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