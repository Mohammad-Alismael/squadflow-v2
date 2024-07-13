"use client";
import React, { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [role_, setRole_] = useState(role);
  const handleChange = (value: string) => {
    setRole_(value);
    !showDelete && addParticipant({ user: user._id, role: value });
    showDelete && changeRole({ user: user._id, role: value });
  };

  const handleSelectClick = () => {
    !showDelete && addParticipant({ user: user._id, role: role_ });
    showDelete && removeParticipant(user._id);
  };
  const handlePressOnIcon = () => {
    removeParticipant(user._id);
  };
  return (
    <div
      className={clsx(
        "py-3 px-4 flex flex-row justify-between items-center gap-4 hover:bg-gray-100 transition-colors",
        showDelete && "bg-gray-100"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={`${user.username} avatar`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <p className="m-0 font-bold text-gray-900">{user.username}</p>
          <span className="text-sm text-gray-600">{user.email}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Select onValueChange={handleChange} defaultValue={role_}>
          <SelectTrigger className="w-[120px] h-[36px] border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={handleSelectClick}
          className="bg-green-500 text-white rounded-md py-1 px-3 hover:bg-blue-600 transition-colors focus:outline-none focus:ring focus:ring-blue-300"
        >
          {showDelete ? "Unselect" : "Select"}
        </button>
        {showDelete && (
          <button
            onClick={handlePressOnIcon}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
            aria-label="Delete"
          >
            <TrashIcon className="h-4 w-4 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Participant;
