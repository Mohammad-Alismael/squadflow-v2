import React from "react";
import PropTypes from "prop-types";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

Loading.propTypes = {};

function Loading() {
  return (
    <div className="space-y-8">
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
      <div className="">
        {/* Skeleton for SelectWorkspace */}
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}

export default Loading;
