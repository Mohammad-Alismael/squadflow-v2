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
      {assigness.map((item) => {
        return (
          <Avatar key={item._id}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        );
      })}
    </>
  );
}

export default ShowAssignees;
