import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PopulatedUser } from "@/utils/@types/user";

function TaskParticipants({ assigness }: { assigness: PopulatedUser[] }) {
  console.log({ assigness });
  return (
    <div className="flex flex-row items-center gap-1">
      {assigness.slice(0, 5).map((item, index) => (
        <Avatar key={`${item._id}-${index}`} className="w-8 h-8">
          <AvatarImage src={item.photoURL} />
          <AvatarFallback>{item.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
      ))}
      {assigness.length > 5 && (
        <div className="w-7 h-7 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full p-0.5">
          +{assigness.length - 5}
        </div>
      )}
    </div>
  );
}

export default TaskParticipants;
