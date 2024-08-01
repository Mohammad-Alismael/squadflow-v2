"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  handleCreateWorkspace,
  handleUpdateWorkspace,
  revalidateWorkspacePath,
} from "@/app/(app)/workspaces/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetWorkspaceById } from "@/utils/hooks/workspace/useGetWorkspaceById";
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";
import ParticipantsList from "@/components/Dialogs/components/ParticipantsList";
import { formSchema } from "@/components/Dialogs/scehmas/workspaceSchema";
import { useQueryClient } from "react-query";
import ParticipantsComponentSkeleton from "@/components/Dialogs/components/ParticipantsComponentSkeleton";

function UpdateWorkspaceDialog() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const workspaceId = searchParams.get("workspaceId") as string;
  const { data: workspace, isLoading: isLoadingWorkspace } =
    useGetWorkspaceById(workspaceId);

  const { setParticipants, reset } = workspaceParticipantStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      participants: [],
    },
  });
  const joinedParticipants = workspaceParticipantStore(
    (state) => state.participants
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.clearErrors();
    try {
      workspaceId &&
        (await handleUpdateWorkspace(
          { ...values, participants: joinedParticipants },
          workspaceId
        ));
      window.history.replaceState(null, "", "/workspaces");
      await queryClient.invalidateQueries([workspaceId]);
      await queryClient.refetchQueries([workspaceId]);
      revalidateWorkspacePath();
    } catch (error) {
      console.log(error);
      form.setError("participants", { type: "custom", message: error.message });
    }
  }

  useEffect(() => {
    if (!isLoadingWorkspace && workspace) {
      form.reset({
        title: workspace.title,
        participants: workspace.participants ?? [],
      });
      workspace.participants && setParticipants(workspace.participants);
    }
  }, [workspaceId, isLoadingWorkspace]);
  return (
    <Dialog
      open={workspaceId !== null}
      onOpenChange={() => {
        window.history.replaceState(null, "", "/workspaces");
        reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">update workspace</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isLoadingWorkspace && <ParticipantsComponentSkeleton />}
        {!isLoadingWorkspace && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <ParticipantsList
                        joinedParticipants={joinedParticipants}
                      />
                    </FormControl>
                    <FormMessage />
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
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UpdateWorkspaceDialog;
