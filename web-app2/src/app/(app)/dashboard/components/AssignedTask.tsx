import React from "react";
import { IDashboardTask } from "@/utils/@types/task";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";

function AssignedTask({ data }: { data: IDashboardTask }) {
  if (data)
    return (
      <div className="">
        <Link
          href={`/workspaces/${data.workspace._id}?taskId=${data._id}`}
          prefetch={false}
        >
          <div className="flex flex-row items-center justify-between px-3 py-2 border-[1px] border-gray-200 rounded-xl">
            <div>
              <span className="opacity-50 text-sm">{data.workspace.title}</span>
              <p>{data.title}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <div className="flex flex-row sitems-center gap-1">
                {data.labels.map((item) => (
                  <p
                    key={item._id.toString()}
                    className={`py-1 px-2 border-2 border-gray-200 rounded-full bg-[#${item.color}]`}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
              <div className="flex flex-row sitems-center gap-1">
                {data.participants.map((participant) => (
                  <Avatar key={participant._id} className="w-6 h-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{participant.username}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default AssignedTask;
