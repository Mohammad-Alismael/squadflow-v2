import React from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

async function WorkspaceTabsSkeleton() {
  return (
    <React.Fragment>
      <Tabs defaultValue="account" className="w-[400px] hidden md:block">
        <TabsList defaultValue="">
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
