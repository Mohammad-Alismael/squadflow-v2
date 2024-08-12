import React from "react";
import PropTypes from "prop-types";
import AuthForm from "@/components/AuthForm";
import { Skeleton } from "@/components/ui/skeleton";

Loading.propTypes = {};

function Loading() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="w-[400px] min-w-[320px]">
        {/* Skeleton for Header with Logo */}
        <div className="p-2 mb-2 flex items-center justify-center gap-2 bg-white rounded-lg">
          <Skeleton className="w-14 h-14 rounded-full" />
          <Skeleton className="w-40 h-10" />
        </div>

        {/* Skeleton for Tabs */}
        <div className="w-full grid grid-cols-2 gap-2 mb-4">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>

        {/* Skeleton for Card Content */}
        <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
          {/* Skeleton for Alert */}
          <Skeleton className="w-full h-20" />

          {/* Skeleton for Form Fields */}
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />

          {/* Skeleton for Button */}
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </main>
  );
}

export default Loading;
