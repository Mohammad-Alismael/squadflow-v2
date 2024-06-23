import React from "react";
import PropTypes from "prop-types";
import AssignedTask from "@/app/(app)/dashboard/components/AssignedTask";

TodayTasksDeadlines.propTypes = {};

function TodayTasksDeadlines() {
  return (
    <div className="px-3 py-2.5 bg-white h-1/2 rounded-xl">
      <h4 className="capitalize font-bold">tasks deadline by today</h4>
      <div className="space-y-2 my-2 overflow-auto">
        {/*<AssignedTask />*/}
        {/*<AssignedTask />*/}
        {/*<AssignedTask />*/}
      </div>
    </div>
  );
}

export default TodayTasksDeadlines;
