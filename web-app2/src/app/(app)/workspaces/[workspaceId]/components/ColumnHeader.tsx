"use client";
import React, { startTransition, useOptimistic, useState } from "react";
import { MoreVertical } from "react-feather";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import ColumnMenu from "@/app/(app)/workspaces/[workspaceId]/components/ColumnMenu";
import { Input } from "@/components/ui/input";
import { updateColumnTitleById } from "@/utils/actions/workspace-actions";
import { Skeleton } from "@/components/ui/skeleton";
function ColumnHeader({
  data,
  workspaceId,
  length,
  ...rest
}: {
  workspaceId: string;
  data: WorkspaceColumn;
  length: number;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = async (event: { key: string }) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      await updateColumnTitleById(workspaceId, data._id, title);
      setIsLoading(false);
      setIsEditMode(false);
    }
  };

  return (
    <div
      className="flex flex-row justify-between items-center px-1 pb-1"
      {...rest}
    >
      <div className="flex justify-between items-center gap-x-2">
        <div>
          {!isEditMode && !isLoading && (
            <span className="capitalize font-bold">{data.title}</span>
          )}
          {isEditMode && !isLoading && (
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              onKeyPress={handleKeyPress}
            />
          )}
          {isLoading && <Skeleton className="w-20 h-full" />}
        </div>
        <div className="rounded-full bg-green-700 text-white flex items-center justify-center w-6 h-6">
          <span className="flex items-center justify-center rounded-full text-white">
            {length}
          </span>
        </div>
      </div>
      <ColumnMenu columnId={data._id} onEdit={() => setIsEditMode(true)} />
    </div>
  );
}

export default ColumnHeader;
