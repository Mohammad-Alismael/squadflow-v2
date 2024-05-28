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

function Participant() {
  return (
    <div className="flex flex-row justify-between items-center gap-4">
      <div className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <p className="p-0 m-0 font-bold">username</p>
          <span className="opacity-70 text-sm p-0 m-0">email address</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Select>
          <SelectTrigger className="w-[120px] h-[31px]">
            <SelectValue placeholder="select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">admin</SelectItem>
            <SelectItem value="editor">editor</SelectItem>
            <SelectItem value="viewer">viewer</SelectItem>
          </SelectContent>
        </Select>
        <div className="bg-gray-200 rounded-full p-2">
          <TrashIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default Participant;
