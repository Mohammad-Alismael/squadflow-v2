"use client";

import React from "react";
import PropTypes from "prop-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import { CommunityResponse } from "@/utils/@types/community";

CommunityFound.propTypes = {};

function CommunityFound({ data }: { data: CommunityResponse }) {
  console.log({ data });
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
        {/*<div className="flex items-center gap-2">*/}
        {/*  {data.participants.length === 0 && <p>no participants</p>}*/}
        {/*  {!!data.participants.length &&*/}
        {/*    data.participants.slice(0, 7).map((participant) => (*/}
        {/*      <Avatar className="h-8 w-8 border">*/}
        {/*        <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />*/}
        {/*        <AvatarFallback>{participant.user.username}</AvatarFallback>*/}
        {/*      </Avatar>*/}
        {/*    ))}*/}
        {/*  {!!data.participants.length && (*/}
        {/*    <div className="text-gray-500 dark:text-gray-400">*/}
        {/*      {data.participants.slice(7).length} more*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </CardContent>
  );
}

export default CommunityFound;
