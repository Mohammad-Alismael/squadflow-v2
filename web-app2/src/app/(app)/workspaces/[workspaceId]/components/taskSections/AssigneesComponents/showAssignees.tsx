"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { shallow } from "zustand/shallow";

ShowAssignees.propTypes = {};

function ShowAssignees() {
  const assigness = useTaskPropertiesStore(
    (state) => state.participants,
    shallow
  );

  return (
    <>
      {assigness.slice(0, 5).map((item, index) => (
        <Avatar key={`${item._id}-${index}`} className="w-8 h-8">
          <AvatarImage src={item.photoURL} />
          <AvatarFallback>{item.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
      ))}
      {assigness.length > 5 && (
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full p-0.5">
          +{assigness.length - 5}
        </div>
      )}
    </>
  );
}

export default ShowAssignees;
