import React from "react";
import PropTypes from "prop-types";
import UserComponentSkeleton from "@/components/Dialogs/components/UserComponentSkeleton";

function FindParticipantsSkeleton() {
  return (
    <div className="space-y-2">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <UserComponentSkeleton key={index} />
        ))}
    </div>
  );
}

export default FindParticipantsSkeleton;
