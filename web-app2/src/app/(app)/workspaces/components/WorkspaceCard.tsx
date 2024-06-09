import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";

function WorkspaceCard({ data }: { data: IWorkspace }) {
  return (
    <Link href={`/workspaces/${data._id}`} passHref>
      <Card className="">
        <CardHeader className="px-2 py-0 m-0 flex flex-row items-center justify-between">
          <CardTitle className="text-xl">{data.title}</CardTitle>
          <WorkspaceMenu workspaceId={data._id as string} />
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="mt-4 flex items-center gap-2">
              {data.participants.map((participant) => (
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>{participant.user}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2">
              <Progress value={data.progress} className="bg-green-800" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {data.progress}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default WorkspaceCard;
