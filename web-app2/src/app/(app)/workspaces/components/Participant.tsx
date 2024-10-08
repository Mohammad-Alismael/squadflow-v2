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
  role = "admin",
}: {
  user: PopulatedUser;
  showDelete: boolean;
  role?: "admin" | "editor" | "viewer";
}) {
  const { addParticipant, removeParticipant, changeRole } =
    workspaceParticipantStore();
  const [role_, setRole_] = useState<"admin" | "editor" | "viewer">(role);
  const handleChange = (value: "admin" | "editor" | "viewer") => {
    setRole_(value);
    !showDelete && addParticipant({ user: user._id, role: value });
    showDelete && changeRole({ user: user._id, role: value });
  };

  const handleSelectClick = () => {
    !showDelete && addParticipant({ user: user._id, role: role_ });
    showDelete && removeParticipant(user._id);
  };
  return (
    <div
      className={clsx(
        "py-3 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 hover:bg-gray-100 transition-colors",
        showDelete && "bg-gray-100"
      )}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
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
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mt-2 md:mt-0">
        <Select onValueChange={handleChange} defaultValue={role_}>
          <SelectTrigger className="w-full md:w-[120px] h-[36px] border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200">
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
          className={clsx(
            "w-full md:w-auto text-white rounded-md py-1 px-3 hover:bg-blue-600 transition-colors focus:outline-none focus:ring focus:ring-blue-300",
            showDelete ? "bg-red-500" : "bg-green-500"
          )}
        >
          {showDelete ? "Remove" : "Select"}
        </button>
      </div>
    </div>
  );
}

export default Participant;
