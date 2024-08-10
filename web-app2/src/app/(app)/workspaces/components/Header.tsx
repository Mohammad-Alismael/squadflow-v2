import React from "react";
import CreateWorkspaceDialog from "@/components/Dialogs/CreateWorkspaceDialog";
import ListToggle from "@/app/(app)/workspaces/components/ListToggle";
import SelectSortType from "@/app/(app)/workspaces/components/SelectSortType";
import { getUserAuthFromJWT } from "@/utils/helper";
import JoinCommunityDialog from "@/components/Dialogs/JoinCommunityDialog";
import { Button } from "@/components/ui/button";

async function Header() {
  const { _id: userId, communityId } = await getUserAuthFromJWT();

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <SelectSortType />
      <div className="flex flex-row items-center justify-between gap-2">
        <ListToggle />
        {communityId !== "" && <CreateWorkspaceDialog />}
        {communityId === "" && (
          <JoinCommunityDialog>
            <Button className="capitalize bg-green-800">join community</Button>
          </JoinCommunityDialog>
        )}
      </div>
    </div>
  );
}
export default Header;
