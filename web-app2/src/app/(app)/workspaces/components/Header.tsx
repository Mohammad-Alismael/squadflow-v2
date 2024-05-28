import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateWorkspaceDialog from "@/components/Dialogs/CreateWorkspaceDialog";
import ListToggle from "@/app/(app)/workspaces/components/ListToggle";

function Header() {
  // <Link href={{ pathname: '/search', query: { keyword: 'this way' } }}><a>path</a></Link>

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="select order list" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabticaly">A-Z</SelectItem>
          <SelectItem value="accedning">latest to oldest</SelectItem>
          <SelectItem value="decending">oldest to latest</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-row items-center justify-between gap-2">
        <ListToggle />
        <CreateWorkspaceDialog />
      </div>
    </div>
  );
}
export default Header;
