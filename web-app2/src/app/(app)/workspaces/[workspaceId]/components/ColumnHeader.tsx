import React from "react";
import { MoreVertical } from "react-feather";
function ColumnHeader({ title, length }: { title: string; length: number }) {
  return (
    <div className="flex justify-between pb-4">
      <div className="flex justify-center items-center gap-1">
        <span className="capitalize">{title}</span>
        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
          {length}
        </span>
      </div>

      <MoreVertical size={20} />
    </div>
  );
}

export default ColumnHeader;
