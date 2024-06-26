import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommunityResponse, ICommunity } from "@/utils/@types/community";
import CommunityFound from "@/app/(app)/settings/components/CommunityFound";
import { cookies } from "next/headers";
import JoinCommunityForm from "@/app/(app)/settings/components/JoinCommunityForm";
import CommunitySectionFooter from "@/app/(app)/settings/components/CommunitySectionFooter";
const fetchCommunity = async () => {
  const res = await fetch(`${process.env.URL_API_ROUTE}/api/community`, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    cache: "no-cache",
  });
  if (res.status === 200) {
    return {
      status: 200,
      data: await res.json(),
    };
  }
  return {
    status: res.status,
    data: null,
  };
};
async function CommunitySection() {
  const { data, status } = (await fetchCommunity()) as {
    data: CommunityResponse | null;
    status: number;
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Community Settings</CardTitle>
        <CardDescription>Manage your community preferences.</CardDescription>
      </CardHeader>
      {status === 204 && (
        <CardContent className="space-y-4">
          <p>
            you don't have a community, either you join a community or create
            community
          </p>
          <JoinCommunityForm />
        </CardContent>
      )}
      {status === 200 && data && <CommunityFound data={data} />}
      <CommunitySectionFooter status={status} code={data?.code as string} />
    </Card>
  );
}

export default CommunitySection;
