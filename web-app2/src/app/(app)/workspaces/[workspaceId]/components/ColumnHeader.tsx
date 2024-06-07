import React from "react";
import { MoreVertical } from "react-feather";
import { WorkspaceColumn } from "@/utils/@types/workspace";
function ColumnHeader({
  data,
  length,
  ...rest
}: {
  data: WorkspaceColumn;
  length: number;
}) {
  return (
    <div className="flex justify-between items-start pb-3" {...rest}>
      <div className="flex justify-center items-center gap-2">
        <div>
          <span className="capitalize font-bold">{data.title}</span>
          <div
            style={{
              height: 6,
              borderRadius: 10,
              backgroundColor: data.color,
              margin: 0,
              padding: 0,
            }}
          />
        </div>
        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
          {length}
        </span>
      </div>

      <MoreVertical size={20} />
    </div>
  );
}

export default ColumnHeader;
