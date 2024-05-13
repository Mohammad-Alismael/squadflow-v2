import React from "react";
import PropTypes from "prop-types";
import ListToggle from "@/app/(app)/workspaces/components/ListToggle";
import CreateWorkspaceDialog from "@/components/Dialogs/CreateWorkspaceDialog";
import { Button } from "@/components/ui/button";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clsx } from "clsx";

Header.propTypes = {};

function Header({
  workspaceId,
  className,
}: {
  workspaceId: string;
  className: string;
}) {
  return (
    <div
      className={clsx(
        "w-full flex flex-row items-center justify-between",
        className
      )}
    >
      <Select>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="group by" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="alphabticaly">A-Z</SelectItem>
          <SelectItem value="accedning">latest to oldest</SelectItem>
          <SelectItem value="decending">oldest to latest</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-row items-center justify-between gap-2">
        <CreateWorkspaceDialog>
          <Button className="capitalize bg-green-800">modify columns</Button>
        </CreateWorkspaceDialog>
        <WorkspaceMenu workspaceId={workspaceId} />
      </div>
    </div>
  );
}

export default Header;
