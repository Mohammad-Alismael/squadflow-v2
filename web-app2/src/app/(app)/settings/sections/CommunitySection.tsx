import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommunityResponse } from "@/utils/@types/community";
import CommunityFound from "@/app/(app)/settings/components/CommunityFound";
import JoinCommunityForm from "@/app/(app)/settings/components/JoinCommunityForm";
import CommunitySectionFooter from "@/app/(app)/settings/components/CommunitySectionFooter";
import { fetchCommunity } from "@/utils/actions/settings-actions";
async function CommunitySection() {
  const data = (await fetchCommunity()) as CommunityResponse & {
    status: number;
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Community Settings</CardTitle>
        <CardDescription>Manage your community preferences.</CardDescription>
      </CardHeader>
      {data.status === 204 && (
        <CardContent className="space-y-4">
          <p>
            you don't have a community, either you join a community or create
            community
          </p>
          <JoinCommunityForm />
        </CardContent>
      )}
      {data.status === 200 && data && <CommunityFound data={data} />}
      <CommunitySectionFooter
        status={data.status}
        code={data?.code as string}
      />
    </Card>
  );
}

export default CommunitySection;
