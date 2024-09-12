import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { CommunityResponse } from "@/utils/@types/community";
import DisplayParticipants from "@/app/(app)/settings/components/DisplayParticipants";

function CommunityFound({ data }: { data: CommunityResponse }) {
  return (
    <CardContent className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="community-name">Community Name</Label>
        <Input
          defaultValue="My Community"
          id="community-name"
          value={data.name}
          disabled={true}
        />
      </div>
      {data.isAdmin && (
        <div className="space-y-1">
          <Label htmlFor="community-name">Community code</Label>
          <Input
            defaultValue="My Community"
            id="community-name"
            value={data.code}
            disabled={true}
          />
        </div>
      )}
      <div className="space-y-1">
        <Label htmlFor="community-participants">Community Participants</Label>
        <div className="flex items-center gap-1">
          {data.participants.length === 0 && <p>no participants</p>}
          {!!data.participants.length && (
            <DisplayParticipants
              participants={JSON.parse(JSON.stringify(data.participants))}
            />
          )}
          {!!data.participants.length &&
            !!data.participants.slice(7).length && (
              <div className="text-gray-500 dark:text-gray-400">
                {data.participants.slice(7).length} more
              </div>
            )}
        </div>
      </div>
    </CardContent>
  );
}

export default CommunityFound;
