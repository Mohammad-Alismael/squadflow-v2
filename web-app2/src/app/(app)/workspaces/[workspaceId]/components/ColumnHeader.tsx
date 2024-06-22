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
    <div className="flex justify-between items-start p-1" {...rest}>
      <div className="flex justify-center items-center gap-x-2">
        <div>
          <span className="capitalize font-bold">{data.title}</span>
          {/*<div*/}
          {/*  style={{*/}
          {/*    height: 6,*/}
          {/*    borderRadius: 10,*/}
          {/*    backgroundColor: data.color,*/}
          {/*    margin: 0,*/}
          {/*    padding: 0,*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
        <div className="rounded-full bg-green-700 text-white flex items-center justify-center w-6 h-6">
          <span className="flex items-center justify-center rounded-full text-white">
            {length}
          </span>
        </div>
      </div>

      <MoreVertical size={20} />
    </div>
  );
}

export default ColumnHeader;
