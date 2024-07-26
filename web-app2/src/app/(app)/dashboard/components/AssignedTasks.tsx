import React from "react";
import PropTypes from "prop-types";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import { getAllTasksCreatedParticipatedAction } from "@/utils/actions/dashboard-actions";
import { IDashboardTask } from "@/utils/@types/task";
import NoTasksFound from "@/app/(app)/dashboard/components/NoTasksFound";

async function AssignedTasks({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const tasks =
    (await getAllTasksCreatedParticipatedAction()) as IDashboardTask[];
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <h4 className="capitalize font-bold">tasks assigned to you</h4>
      <div className="h-[90%] space-y-2 my-2 overflow-auto">
        {selectedWorkspaceId &&
          tasks
            .filter(
              (task) => task.workspace._id.toString() === selectedWorkspaceId
            )
            .map((task) => (
              <AssignedTask
                key={task._id}
                data={JSON.parse(JSON.stringify(task))}
              />
            ))}
        {!selectedWorkspaceId &&
          tasks
            .slice(0, 5)
            .map((task) => (
              <AssignedTask
                key={task._id}
                data={JSON.parse(JSON.stringify(task))}
              />
            ))}
        {tasks.length === 0 && <NoTasksFound />}
      </div>
    </div>
  );
}

export default AssignedTasks;
