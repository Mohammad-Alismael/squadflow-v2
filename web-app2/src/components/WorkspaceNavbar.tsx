import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "react-feather";
import { Input } from "@/components/ui/input";
import SearchDialog from "@/components/Dialogs/SearchDialog";
async function WorkspaceNavbar({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="w-full flex items-start justify-between float-right">
      <div>
        <p className="text-sm opacity-50">
          show team members here. {workspaceId}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <SearchDialog>
          <Input type="text" className="w-96 h-[36px]" />
        </SearchDialog>
        <Bell size={30} className="p-1 bg-white rounded-xl h-[36px] w-[36px]" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default WorkspaceNavbar;
