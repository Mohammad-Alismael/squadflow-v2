import React from "react";
import CreateWorkspaceDialog from "@/components/Dialogs/CreateWorkspaceDialog";
import ListToggle from "@/app/(app)/workspaces/components/ListToggle";
import SelectSortType from "@/app/(app)/workspaces/components/SelectSortType";

function Header() {
  // <Link href={{ pathname: '/search', query: { keyword: 'this way' } }}><a>path</a></Link>

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <SelectSortType />
      <div className="flex flex-row items-center justify-between gap-2">
        <ListToggle />
        <CreateWorkspaceDialog />
      </div>
    </div>
  );
}
export default Header;
