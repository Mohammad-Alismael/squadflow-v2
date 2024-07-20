import React from "react";
import PropTypes from "prop-types";
import { WorkspaceColumn } from "@/utils/@types/workspace";

DndColumn.propTypes = {};

function DndColumn({ data }: { data: WorkspaceColumn }) {
  return (
    <div className="p-1 border-2 border-gray-50 rounded">
      <p>{data.title}</p>
    </div>
  );
}

export default DndColumn;
