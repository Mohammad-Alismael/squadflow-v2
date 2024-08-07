import React from "react";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";
import WorkspaceLabels from "@/app/(app)/dashboard/components/WorkspaceLabels";
import { getAllTasksAction } from "@/utils/actions/dashboard-actions";
import { IDashboardTask } from "@/utils/@types/task";
import { Button } from "@/components/ui/button";
import NoTasksFound from "@/app/(app)/dashboard/components/NoTasksFound";
import CreateQuickTaskDialog from "@/components/Dialogs/CreateQuickTaskDialog";

async function CurrentTaskList({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const tasks = (await getAllTasksAction()) as IDashboardTask[];
  return (
    <div className="flex flex-col h-full px-3 py-2.5 bg-white rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <div className="max-w-80 md:max-w-96 flex flex-col gap-2 items-start flex-shrink-0">
          <h4 className="capitalize font-bold">all tasks</h4>
          <WorkspaceLabels />
        </div>
        {/*<CreateQuickTaskDialog>*/}
        {/*  <Button size="sm">+ Task</Button>*/}
        {/*</CreateQuickTaskDialog>*/}
      </div>
      <div className="space-y-2 my-3 h-[38rem] overflow-y-auto">
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
          tasks.map((task) => (
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

export default CurrentTaskList;
