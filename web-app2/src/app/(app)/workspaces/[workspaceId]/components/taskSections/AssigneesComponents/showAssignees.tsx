"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useTaskPropertiesStore,
  useTaskSelectors,
} from "@/utils/store/taskPropertiesStore";

ShowAssignees.propTypes = {};

function ShowAssignees() {
  const assigness = useTaskPropertiesStore((state) => state.participants);
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
