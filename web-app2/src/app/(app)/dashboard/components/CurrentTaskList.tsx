import React from "react";
import WorkspaceLabels from "@/app/(app)/dashboard/components/WorkspaceLabels";
import CreateQuickTaskDialog from "@/components/Dialogs/CreateQuickTaskDialog";
import { getUserAuthFromJWT } from "@/utils/helper";
import CurrentTaskListInfiniteScroll from "@/app/(app)/dashboard/components/CurrentTaskListInfiniteScroll";

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
        <CurrentTaskListInfiniteScroll
          selectedWorkspaceId={selectedWorkspaceId}
        />
      </div>
    </div>
  );
}

export default CurrentTaskList;
