"use client";
import React from "react";
import { WorkspaceColumn } from "@/utils/@types/workspace";
import { TrashIcon, GripVerticalIcon } from "lucide-react";
import { deleteColumn } from "@/utils/actions/workspace-actions";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";
import { revalidateURL } from "@/components/Dialogs/actions";
import { Draggable } from "@hello-pangea/dnd";
export function getWorkspaceIdFromUrl(url: string): string {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/");
  return pathSegments[pathSegments.length - 1];
}
function DndColumn({ data }: { data: WorkspaceColumn }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handlePressOnIcon = async () => {
    try {
      const workspaceId = getWorkspaceIdFromUrl(window.location.href);
      workspaceId && (await deleteColumn(workspaceId as string, data._id));
      await queryClient.invalidateQueries([workspaceId]);
      await queryClient.refetchQueries([workspaceId]);
      revalidateURL(workspaceId as string);
      toast({ title: "successfully deleted column" });
    } catch (e) {
      toast({ title: e.message });
    }
  };
  return (
    <Draggable draggableId={data._id} index={data.order}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-row items-center justify-between p-1 border-2 border-gray-50 rounded"
        >
          <div className="flex flex-row items-center gap-2">
            <div {...provided.dragHandleProps}>
              <GripVerticalIcon className="h-4 w-4 text-gray-700" />
            </div>
            <p>{data.title}</p>
          </div>
          <button
            onClick={handlePressOnIcon}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
            aria-label="Delete"
          >
            <TrashIcon className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default DndColumn;
