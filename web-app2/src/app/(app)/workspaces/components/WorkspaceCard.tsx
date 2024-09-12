import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";
import { clsx } from "clsx";
import { USER_ROLES } from "@/utils/helper-client";

async function WorkspaceCard({ data }: { data: IWorkspace }) {
  const role = await getWorkspacePrivilege(data._id as string);
  return (
    <div className="w-full">
      <Link href={`/workspaces/${data._id}?tabs=kanban`} passHref>
        <Card className="w-full">
          <CardHeader
            className={clsx(
              "px-2 py-0 m-0 flex flex-row items-center justify-between",
              role !== USER_ROLES.admin && "p-2"
            )}
          >
            <CardTitle className="text-xl truncate w-72">
              {data.title}
            </CardTitle>
            {role === USER_ROLES.admin && (
              <WorkspaceMenu workspaceId={data._id as string} />
            )}
          </CardHeader>

          <CardContent>
            <div className="flex flex-row items-center gap-1">
              {data.participants.slice(0, 5).map((participant) => (
                <Avatar key={participant._id} className="w-7 h-7">
                  <AvatarImage src={participant.user.photoURL} />
                  <AvatarFallback>{participant.user.username}</AvatarFallback>
                </Avatar>
              ))}
              {data.participants.length > 5 && (
                <div className="w-7 h-7 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full p-0.5">
                  +{data.participants.length - 5}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default WorkspaceCard;
