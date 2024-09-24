import React from "react";
import WorkspaceLabels from "@/app/(app)/dashboard/components/WorkspaceLabels";
import CreateQuickTaskDialog from "@/components/Dialogs/CreateQuickTaskDialog";
import { getUserAuthFromJWT } from "@/utils/helper";
import CurrentTaskListInfiniteScrollWrapper from "@/app/(app)/dashboard/components/CurrentTaskListInfiniteScrollWrapper";

async function CurrentTaskList({
  selectedWorkspaceId,
}: {
  selectedWorkspaceId: string;
}) {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  return (
    <div className="flex flex-col h-full px-3 py-2.5 bg-white rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <div className="w-[90%] flex flex-col gap-2 items-start flex-shrink-0">
          <h4 className="capitalize font-bold">all tasks</h4>
          <WorkspaceLabels />
        </div>
        {communityId !== "" && <CreateQuickTaskDialog />}
      </div>
      <div className="space-y-2 my-3 h-[38rem] overflow-y-auto">
        <CurrentTaskListInfiniteScrollWrapper />
      </div>
    </div>
  );
}

export default CurrentTaskList;
