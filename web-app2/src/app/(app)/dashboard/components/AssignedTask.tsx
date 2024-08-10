import React from "react";
import { IDashboardTask } from "@/utils/@types/task";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";

function AssignedTask({ data }: { data: IDashboardTask }) {
  if (data)
    return (
      <div className="">
        <Link href={`/task/${data.workspace._id}/${data._id}`} prefetch={false}>
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
                    className="inline px-4 py-1 rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
              <div className="flex flex-row sitems-center gap-1">
                {data.participants.map((participant) => (
                  <Avatar key={participant._id} className="w-8 h-8">
                    <AvatarImage src={participant.photoURL} />
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
