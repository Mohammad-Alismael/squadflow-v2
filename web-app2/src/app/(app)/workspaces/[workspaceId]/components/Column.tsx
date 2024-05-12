import React from "react";
import TaskCard from "../components/TaskCard";
import { MoreVertical } from "react-feather";
import { Button } from "@/components/ui/button";
import { ITask } from "@/utils/@types/task";
import { cookies } from "next/headers";
const fetchTasksForColumnId = async (workspaceId: string, columnId: string) => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks?columnId=${columnId}`,
    {
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};
async function Column({
  data,
  workspaceId,
}: {
  data: { _id: string; order: number; title: string; color: string };
  workspaceId: string;
}) {
  const tasks = await fetchTasksForColumnId(workspaceId, data._id);
  console.log(tasks);
  return (
    <div className="rounded-xl h-full w-1/4 bg-gray-300 p-4">
      <div className="flex justify-between pb-4">
        <div className="flex justify-center items-center gap-1">
          <span className="capitalize">{data.title}</span>
          <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            {tasks.length}
          </span>
        </div>

        <MoreVertical size={20} />
      </div>
      <div className="overflow-auto no-scrollbar">
        {tasks.map((task, i) => {
          return <TaskCard key={task._id} data={task} />;
        })}
      </div>

      <Button className="w-full bg-green-700">+ task card</Button>
    </div>
  );
}

export default Column;
