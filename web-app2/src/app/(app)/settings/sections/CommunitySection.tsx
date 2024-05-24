import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { CommunityResponse, ICommunity } from "@/utils/@types/community";
import CommunityFound from "@/app/(app)/settings/components/CommunityFound";
import { cookies } from "next/headers";
const fetchCommunity = async () => {
  const res = await fetch(`${process.env.URL_API_ROUTE}/api/community`, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    cache: "no-cache",
  });
  console.log(res);
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
            your own community
          </p>
        </CardContent>
      )}
      {status === 200 && data && <CommunityFound data={data} />}
      <CardFooter>
        <Button className="bg-red-600 capitalize">
          {/*<CheckIcon className="mr-2 h-4 w-4" />*/}
          leave community
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CommunitySection;
