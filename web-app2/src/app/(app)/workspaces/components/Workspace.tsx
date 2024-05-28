import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";

function Workspace({ data }: { data: IWorkspace }) {
  return (
    <Card className="">
      <CardHeader className="px-2 py-0 m-0 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{data.title}</CardTitle>
        <WorkspaceMenu workspaceId={data._id as string} />
      </CardHeader>
      <Link href={`/workspaces/${data._id}`}>
        <CardContent>
          <div className="space-y-2">
            <div className="mt-4 flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/avatars/03.png" />
                <AvatarFallback>LW</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Progress value={75} className="bg-green-800" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                75%
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default Workspace;
