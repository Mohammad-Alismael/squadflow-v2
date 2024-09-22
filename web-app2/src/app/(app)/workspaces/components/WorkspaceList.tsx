import React from "react";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";

import { USER_ROLES } from "@/utils/helper-client";
import clsx from "clsx";

WorkspaceList.propTypes = {};

async function WorkspaceList({ data }: { data: IWorkspace }) {
  const role = await getWorkspacePrivilege(data._id as string);
  return (
    <div>
      <Link href={`/workspaces/${data._id}?tabs=kanban`} passHref>
        <div
          className={clsx(
            "bg-white border-2 rounded-xl flex items-center justify-between",
            role === USER_ROLES.admin ? "px-4 py-2" : "px-4 py-4"
          )}
        >
          <p className="text-xl truncate w-72">{data.title}</p>
          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center gap-2">
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
            {role === USER_ROLES.admin && (
              <WorkspaceMenu workspaceId={data._id as string} />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default WorkspaceList;
