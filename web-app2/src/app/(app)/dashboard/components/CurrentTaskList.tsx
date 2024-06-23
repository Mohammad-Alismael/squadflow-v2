import React from "react";
import PropTypes from "prop-types";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import WorkspaceLabels from "@/app/(app)/dashboard/components/WorkspaceLabels";
import { getAllTasksAction } from "@/utils/actions/dashboard-actions";
import { IDashboardTask } from "@/utils/@types/task";

CurrentTaskList.propTypes = {};

async function CurrentTaskList() {
  const tasks = (await getAllTasksAction()) as IDashboardTask[];
  return (
    <div className="px-3 py-2.5 bg-white h-full rounded-xl overflow-y-auto">
      <div className="flex flex-col gap-2 items-start">
        <h4 className="capitalize font-bold">all tasks</h4>
        <WorkspaceLabels />
      </div>
      <div className="space-y-2 my-3 overflow-auto">
        {tasks.map((task) => (
          <AssignedTask key={task._id} data={task} />
        ))}
      </div>
    </div>
  );
}

export default CurrentTaskList;
