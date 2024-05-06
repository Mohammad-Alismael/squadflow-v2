import React from "react";
import PropTypes from "prop-types";

TodayTasksDeadlines.propTypes = {};

function TodayTasksDeadlines() {
  return (
    <div className="bg-white min-h-1/2">
      <h3 className="text-2xl">today's tasks</h3>
      <p>this will show all tasks are have deadline by today</p>
    </div>
  );
}

export default TodayTasksDeadlines;
