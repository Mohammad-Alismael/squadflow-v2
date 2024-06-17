import React from "react";
import PropTypes from "prop-types";
import { WorkspaceLabel } from "@/utils/@types/workspace";

TaskLabels.propTypes = {};

function TaskLabels({ labels }: { labels: WorkspaceLabel[] }) {
  const colors = labels.map(({ color }) => color);
  return (
    <div className="flex flex-row gap-2">
      {colors.slice(0, 3).map((color, index) => (
        <div
          key={index}
          style={{
            width: 50,
            height: 3,
            backgroundColor: color,
            margin: 0,
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

export default TaskLabels;
