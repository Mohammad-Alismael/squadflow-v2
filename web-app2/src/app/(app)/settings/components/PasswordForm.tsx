"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Label from "@/components/Label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { handleChangePassword } from "@/utils/actions/settings-actions";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

function PasswordForm() {
  const form = useForm();
  const { toast } = useToast();

  const onSubmit = async (data: { password: string; newPassword: string }) => {
    try {
      await handleChangePassword(data.password, data.newPassword);
      toast({ title: "successfully updated password" });
    } catch (error) {
      form.setError("root", {
        type: "custom",
        message: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <span className="text-red-500">
            {form.formState.errors.root.message}
          </span>
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>new password</FormLabel>
              <FormControl>
                <Input placeholder="new password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="my-8"
          disabled={form.formState.isSubmitting}
        >
          <CheckIcon className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? "loading ..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}

export default PasswordForm;
