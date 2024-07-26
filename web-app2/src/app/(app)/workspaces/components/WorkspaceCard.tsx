import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";
import { USER_ROLES } from "@/utils/helper";
import { clsx } from "clsx";

async function WorkspaceCard({ data }: { data: IWorkspace }) {
  const role = await getWorkspacePrivilege(data._id as string);
  return (
    <Link href={`/workspaces/${data._id}`} passHref>
      <Card className="w-full">
        <CardHeader
          className={clsx(
            "px-2 py-0 m-0 flex flex-row items-center justify-between",
            role !== USER_ROLES.admin && "p-2"
          )}
        >
          <CardTitle className="text-xl truncate w-72">{data.title}</CardTitle>
          {role === USER_ROLES.admin && (
            <WorkspaceMenu workspaceId={data._id as string} />
          )}
        </CardHeader>

        <CardContent>
          <div className="mt-4 flex items-center">
            {data.participants.map((participant) => (
              <Avatar className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                <AvatarImage src={participant.user.photoURL} />
                <AvatarFallback>{participant.user.username}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default WorkspaceCard;
