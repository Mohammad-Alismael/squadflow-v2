import React from "react";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import { getAllTasksDeadLineByTodayAction } from "@/utils/actions/dashboard-actions";
import { IDashboardTask } from "@/utils/@types/task";
import NoTasksFound from "@/app/(app)/dashboard/components/NoTasksFound";

TodayTasksDeadlines.propTypes = {};

async function TodayTasksDeadlines({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const tasks = (await getAllTasksDeadLineByTodayAction()) as IDashboardTask[];
  const tasksList = tasks.filter(
    (task) =>
      !selectedWorkspaceId ||
      task.workspace._id.toString() === selectedWorkspaceId
  );
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <h4 className="capitalize font-bold">tasks deadline by today</h4>
      <div className="h-[90%] space-y-2 my-2 overflow-auto">
        {tasksList.map((task) => (
          <AssignedTask
            key={task._id}
            data={JSON.parse(JSON.stringify(task))}
          />
        ))}
        {(tasks.length === 0 || tasksList.length === 0) && <NoTasksFound />}
      </div>
    </div>
  );
}

export default TodayTasksDeadlines;
