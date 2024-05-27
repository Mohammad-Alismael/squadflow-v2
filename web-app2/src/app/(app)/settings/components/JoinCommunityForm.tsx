"use client";
import React, { useState } from "react";
import { handleJoinCommunityForm } from "@/app/(app)/settings/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
function JoinCommunityForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
          await handleJoinCommunityForm(formData);
          setSuccess("successfully join the community");
        } catch (error) {
          // Capture the error message to display to the user
          setError(error.message);
        } finally {
          setIsLoading(false);
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
      <Button
        type="submit"
        className=" w-1/2 bg-green-600 capitalize"
        disabled={isLoading}
      >
        {!isLoading ? "join community" : "loading.."}
      </Button>
    </form>
  );
}

export default JoinCommunityForm;
