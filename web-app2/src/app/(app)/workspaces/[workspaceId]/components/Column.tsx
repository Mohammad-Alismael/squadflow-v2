import React from "react";
import TaskCard from "../components/TaskCard";
import { MoreVertical } from "react-feather";
import { Button } from "@/components/ui/button";
import { ITask } from "@/utils/@types/task";
import { cookies } from "next/headers";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import CreateTaskDialog from "@/components/Dialogs/CreateTaskDialog";
import ColumnHeader from "@/app/(app)/workspaces/[workspaceId]/components/ColumnHeader";
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
      <ColumnHeader length={tasks.length} title={data.title} />
      <div className="overflow-auto no-scrollbar">
        {tasks.map((task, i) => {
          return (
            <TaskDetailsDialog>
              <TaskCard key={task._id} data={task} />
            </TaskDetailsDialog>
          );
        })}
      </div>
      <CreateTaskDialog>
        <Button className="w-full bg-green-700">+ task card</Button>
      </CreateTaskDialog>
    </div>
  );
}

export default Column;
