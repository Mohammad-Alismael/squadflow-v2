"use client";
import { WorkspaceParticipants } from "@/utils/@types/workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { shallow } from "zustand/shallow";

function AddAssignee({ data }: { data: WorkspaceParticipants }) {
  const assigness = useTaskPropertiesStore(
    (state) => state.participants,
    shallow
  );

  const { addParticipant, removeParticipant } = useTaskPropertiesStore();
  const handleClick = () => {
    addParticipant(data.user);
  };
  const handleClickRemove = () => {
    removeParticipant(data.user);
  };
  const included = assigness.map((item) => item._id).includes(data.user._id);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <p className="p-0 m-0 font-bold">{data.user.username}</p>
          <span className="opacity-70 text-sm p-0 m-0">{data.user.email}</span>
        </div>
      </div>
      {!included && (
        <Button
          onClick={handleClick}
          size="sm"
          className="rounded-full px-4 py-2"
        >
          add
        </Button>
      )}
      {included && (
        <Button
          onClick={handleClickRemove}
          size="sm"
          className="rounded-full px-4 py-2"
        >
          remove
        </Button>
      )}
    </div>
  );
}

export default AddAssignee;
