import React from "react";
import { IDashboardTask } from "@/utils/@types/task";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";
import TaskLabels from "@/app/(app)/workspaces/[workspaceId]/components/TaskLabels";

function AssignedTask({ data }: { data: IDashboardTask }) {
  console.log(data);
  if (data)
    return (
      <div className="">
        <Link href={`/task/${data.workspace._id}/${data._id}`} prefetch={false}>
          <div className="flex flex-row items-center justify-between px-3 py-2 border-[1px] border-gray-200 rounded-xl">
            <div className="flex flex-col gap-y-2 w-full">
              <span className="inline-block opacity-50 text-sm bg-gray-200 px-1 py-0.5 rounded-xl truncate max-w-[200px]">
                {data.workspace.title}
              </span>
              <p className="w-64 truncate">{data.title}</p>
              <div className="flex items-end justify-between">
                {!!data.labels.length && <TaskLabels labels={data.labels} />}
              </div>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <div className="flex flex-row items-center gap-1">
                {data.participants.slice(0, 5).map((participant) => (
                  <Avatar key={participant._id} className="w-8 h-8">
                    <AvatarImage src={participant.photoURL} />
                    <AvatarFallback>{participant.username}</AvatarFallback>
                  </Avatar>
                ))}
                {data.participants.length > 5 && (
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full">
                    +{data.participants.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default AssignedTask;
