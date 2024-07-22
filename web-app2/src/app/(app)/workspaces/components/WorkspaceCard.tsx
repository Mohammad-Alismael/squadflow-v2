import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";

function WorkspaceCard({ data }: { data: IWorkspace }) {
  console.log(data.participants[0]);
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
                  <AvatarImage src={participant.user.photoURL} />
                  <AvatarFallback>{participant.user.username}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default WorkspaceCard;
