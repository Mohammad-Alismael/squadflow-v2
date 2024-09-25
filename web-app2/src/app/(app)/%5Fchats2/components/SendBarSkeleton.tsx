import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

SendBarSkeleton.propTypes = {};

function SendBarSkeleton() {
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex flex-row gap-2 bg-white p-2 rounded">
        <Skeleton className="flex-1 h-10" />
        <Skeleton className="w-24 h-10" />
      </div>
    </div>
  );
}

export default SendBarSkeleton;
