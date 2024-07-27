import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IWorkspace, WorkspaceParticipants } from "@/utils/@types/workspace";

function TaskParticipants({
  assigness,
}: {
  assigness: WorkspaceParticipants[];
}) {
  return (
    <div className="flex flex-row">
      {assigness.map((item, index) => (
        <Avatar key={`${item._id}-${index}`} className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export default TaskParticipants;
