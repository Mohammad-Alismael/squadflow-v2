"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { handleLeaveCommunity } from "@/app/(app)/settings/actions";
import { revalidatePath } from "next/cache";
import CreateCommunityDialog from "@/components/Dialogs/CreateCommunityDialog";
import { useRouter } from "next/navigation";

function CommunitySectionFooter({
  status,
  code,
}: {
  status: number;
  code: string;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await handleLeaveCommunity(code);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CardFooter>
      {status === 200 && (
        <Button
          className="bg-red-600 capitalize"
          onClick={handleLeave}
          disabled={isLoading}
        >
          {!isLoading ? "leave community" : "loading ..."}
        </Button>
      )}
      {status === 204 && (
        <CreateCommunityDialog>
          <Button className="bg-green-600 capitalize">create community</Button>
        </CreateCommunityDialog>
      )}
      {error && <span className="text-red-400">{error}</span>}
    </CardFooter>
  );
}

export default CommunitySectionFooter;
