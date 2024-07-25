import React from "react";
import PropTypes from "prop-types";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";
import { USER_ROLES } from "@/utils/helper";

WorkspaceList.propTypes = {};

async function WorkspaceList({ data }: { data: IWorkspace }) {
  const role = await getWorkspacePrivilege(data._id as string);
  return (
    <div>
      <Link href={`/workspaces/${data._id}`} passHref>
        <div className="bg-white px-4 py-2 border-2 rounded-xl flex items-center justify-between">
          <p>{data.title}</p>
          <div className="flex flex-row items-center gap-4">
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
