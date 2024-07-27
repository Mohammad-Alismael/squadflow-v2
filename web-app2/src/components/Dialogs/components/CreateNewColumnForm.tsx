"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { createNewColumn } from "@/utils/actions/workspace-actions";
import { useQueryClient } from "react-query";
import { revalidateURL } from "@/components/Dialogs/actions";

CreateNewColumnForm.propTypes = {};
const formSchema = z.object({
  title: z.string().min(4, {
    message: "title must be at least 4 characters.",
  }),
});
function CreateNewColumnForm({
  workspaceId,
  columnsLength,
}: {
  workspaceId: string;
  columnsLength: number;
}) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNewColumn(workspaceId, {
      ...values,
      order: columnsLength,
      color: "#000",
    });
    await queryClient.invalidateQueries([workspaceId]);
    await queryClient.refetchQueries([workspaceId]);
    revalidateURL(workspaceId as string);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(
          "flex flex-row gap-2 gap-x-4 items-end",
          form.formState.errors.title && "items-center"
        )}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>column title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "loading ..." : "create column"}
        </Button>
      </form>
    </Form>
  );
}

export default CreateNewColumnForm;
