"use client";
import React from "react";
import { TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommunityResponse } from "@/utils/@types/community";
import { PopulatedUser } from "@/utils/@types/user";
import { clsx } from "clsx";
import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";

function Participant({
  user,
  showDelete = false,
  role = "",
}: {
  user: PopulatedUser;
  showDelete: boolean;
  role?: string;
}) {
  const { addParticipant, removeParticipant, changeRole } =
    workspaceParticipantStore();
  const handleChange = (value: string) => {
    !showDelete && addParticipant({ user: user._id, role: value });
    showDelete && changeRole({ user: user._id, role: value });
  };
  const handlePressOnIcon = () => {
    removeParticipant(user._id);
  };
  return (
    <div
      className={clsx(
        "py-2 px-3 flex flex-row justify-between items-center gap-4 hover:bg-gray-100",
        showDelete && "bg-gray-100"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <p className="p-0 m-0 font-bold">{user.username}</p>
          <span className="opacity-70 text-sm p-0 m-0">{user.email}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Select onValueChange={handleChange} defaultValue={role}>
          <SelectTrigger className="w-[120px] h-[31px]">
            <SelectValue placeholder="select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">admin</SelectItem>
            <SelectItem value="editor">editor</SelectItem>
            <SelectItem value="viewer">viewer</SelectItem>
          </SelectContent>
        </Select>
        {showDelete && (
          <div
            onClick={handlePressOnIcon}
            className="bg-gray-200 rounded-full p-2"
          >
            <TrashIcon className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Participant;
