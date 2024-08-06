import React from "react";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import SelectWorkspace from "@/app/(app)/calendars/components/SelectWorkspace";
import { Skeleton } from "@/components/ui/skeleton";

async function WorkspaceTabsSkeleton() {
  return (
    <React.Fragment>
      <Tabs defaultValue="account" className="w-[400px] hidden md:block">
        <TabsList defaultValue="">
          {/* Skeletons for Tabs */}
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </div>
        </TabsList>
      </Tabs>
      <div className="block md:hidden">
        {/* Skeleton for SelectWorkspace */}
        <Skeleton className="w-full h-8" />
      </div>
    </React.Fragment>
  );
}

export default WorkspaceTabsSkeleton;
