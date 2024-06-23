import React from "react";
import { IDashboardTask } from "@/utils/@types/task";
import Link from "next/link";

function AssignedTask({ data }: { data: IDashboardTask }) {
  if (data)
    return (
      <div>
        <Link
          href={`/workspaces/${data.workspace._id}?taskId=${data._id}`}
          prefetch={false}
        >
          <div className="px-3 py-2 border-[1px] border-gray-200 rounded-xl">
            <span className="opacity-50 text-sm">{data.workspace.title}</span>
            <p>{data.title}</p>
          </div>
        </Link>
      </div>
    );
}

export default AssignedTask;
