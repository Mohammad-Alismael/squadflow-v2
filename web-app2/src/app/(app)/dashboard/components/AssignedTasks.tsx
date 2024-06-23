import React from "react";
import PropTypes from "prop-types";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import { getAllTasksCreatedParticipatedAction } from "@/utils/actions/dashboard-actions";
import { IDashboardTask } from "@/utils/@types/task";

async function AssignedTasks() {
  const tasks =
    (await getAllTasksCreatedParticipatedAction()) as IDashboardTask[];
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <h4 className="capitalize font-bold">tasks assigned to you</h4>
      <div className="max-h-fit space-y-2 my-2 overflow-auto">
        {tasks.map((task) => (
          <AssignedTask key={task._id} data={task} />
        ))}
      </div>
    </div>
  );
}

export default AssignedTasks;
