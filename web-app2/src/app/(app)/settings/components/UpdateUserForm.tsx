"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { handleChangeUserProfile } from "@/utils/actions/settings-actions";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
});
function UpdateUserForm({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
      email,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleChangeUserProfile(values.username, values.email);
      toast({ title: "successfully updated information" });
    } catch (error) {
      const email = error.message.includes("email");
      const username = error.message.includes("username");
      email && form.setError("email", { message: error.message });
      username && form.setError("username", { message: error.message });
      !email && !username && form.setError("root", { message: error.message });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {form.formState.errors.root && (
          <span className="text-red-500">
            {form.formState.errors.root.message}
          </span>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <CheckIcon className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "loading ..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}

export default UpdateUserForm;
