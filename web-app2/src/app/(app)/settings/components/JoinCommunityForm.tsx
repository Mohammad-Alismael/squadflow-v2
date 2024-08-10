"use client";
import React, { useState } from "react";
import { handleJoinCommunityForm } from "@/utils/actions/settings-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
function JoinCommunityForm() {
  const formSchema = z.object({
    communityCode: z.string().max(20),
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.communityCode === "") {
      setSuccess(null);
      setError("Community code text field can't be empty");
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await handleJoinCommunityForm(data);
      setSuccess("Successfully joined the community");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex flex-row items-end gap-4",
        (success || error) && "items-center"
      )}
    >
      <div className="space-y-1 w-1/2">
        <Label htmlFor="community-name">Community code</Label>
        <Input
          className="border-gray-200"
          placeholder="Community code"
          id="community-name"
          {...register("communityCode", { required: true })}
        />
        {success && <span className="text-green-400">{success}</span>}
        {error && <span className="text-red-400">{error}</span>}
        {errors.communityCode && (
          <span className="text-red-400">Community code is required</span>
        )}
      </div>
      <Button
        type="submit"
        className=" w-1/2 bg-green-700 capitalize"
        disabled={isSubmitting}
      >
        {!isSubmitting ? "join community" : "loading..."}
      </Button>
    </form>
  );
}

export default JoinCommunityForm;
