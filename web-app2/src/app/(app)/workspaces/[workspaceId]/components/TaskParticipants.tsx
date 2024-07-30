import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PopulatedUser } from "@/utils/@types/user";

function TaskParticipants({ assigness }: { assigness: PopulatedUser[] }) {
  return (
    <div className="flex flex-row">
      {assigness.map((item, index) => (
        <Avatar key={`${item._id}-${index}`} className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{item.username}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export default TaskParticipants;
