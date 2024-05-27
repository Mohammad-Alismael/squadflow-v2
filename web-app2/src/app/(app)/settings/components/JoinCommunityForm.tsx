"use client";
import React, { useState } from "react";
import { handleJoinCommunityForm } from "@/app/(app)/settings/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import SubmitButton from "@/app/(app)/settings/components/SubmitButton";
function JoinCommunityForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  return (
    <form
      action={async (formData: FormData) => {
        if (formData.get("communityCode") === "") {
          setSuccess(null);
          setError("community code text field can't be empty");
          return;
        }
        setError(null);
        setSuccess(null);
        try {
          await handleJoinCommunityForm(formData);
          setSuccess("successfully join the community");
        } catch (error) {
          // Capture the error message to display to the user
          setError(error.message);
        }
      }}
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
          name="communityCode"
        />
        {success && <span className="text-green-400">{success}</span>}
        {error && <span className="text-red-400">{error}</span>}
      </div>
      <SubmitButton />
    </form>
  );
}

export default JoinCommunityForm;
