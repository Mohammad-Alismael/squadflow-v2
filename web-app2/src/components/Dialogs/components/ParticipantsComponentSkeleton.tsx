import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";

ParticipantsComponentSkeleton.propTypes = {};

function ParticipantsComponentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col w-full gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className="h-10 w-10 rounded-full" />
          ))}
        {/* Skeleton loader for FindParticipantsDialog button */}
        <Skeleton className="h-10 w-10 bg-gray-200 rounded-full p-2 flex items-center justify-center">
          <PlusIcon className="h-6 w-6" />
        </Skeleton>
      </div>
    </div>
  );
}

export default ParticipantsComponentSkeleton;
