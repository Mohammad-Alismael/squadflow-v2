"use client";
import React from "react";
import { WorkspaceLabel } from "@/utils/@types/workspace";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { TrashIcon } from "lucide-react";
import { deleteWorkspaceLabel } from "@/utils/actions/workspace-actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";

function Label({
  data,
  showDeleteIcon = false,
}: {
  data: WorkspaceLabel;
  showDeleteIcon: boolean;
}) {
  const { addLabel, removeLabel } = useTaskPropertiesStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const labels = useTaskPropertiesStore((state) => state.labels);
  const handleClick = () => {
    addLabel(data);
  };
  const handleClickRemove = () => {
    removeLabel(data);
  };
  const handlePressOnIcon = async () => {
    const list = window.location.pathname.split("/");
    try {
      await deleteWorkspaceLabel(list[2], data._id.toString());
      await queryClient.invalidateQueries([`labels-${list[2]}`]);
      toast({ title: "successfully deleted a label" });
    } catch (error) {
      toast({ title: error });
    }
  };
  const included = labels.map((item) => item._id).includes(data._id);

  return (
    <div
      style={{ backgroundColor: data.color }}
      className="space-x-2 inline-flex rounded-full px-2 py-1 justify-center items-center gap-x-2"
    >
      <p
        onClick={included ? handleClickRemove : handleClick}
        className="inline"
      >
        {data.title}
      </p>
      {showDeleteIcon && (
        <button
          onClick={handlePressOnIcon}
          className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
          aria-label="Delete"
        >
          <TrashIcon className="h-4 w-4 text-gray-700" />
        </button>
      )}
    </div>
  );
}

export default Label;
