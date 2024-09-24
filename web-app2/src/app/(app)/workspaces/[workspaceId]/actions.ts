"use server";

import { deleteTask, getTaskId, updateColumnId } from "@/lib/tasks";
import { ObjectId } from "mongodb";
import { deleteWorkspaceById, getWorkspaceById } from "@/lib/workspace";
import { IWorkspace, WorkspaceColumn } from "@/utils/@types/workspace";
import CustomError from "@/utils/CustomError";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import Workspace from "@/models/workspace";

export const updateColumnIdForTaskId = async (
  taskId: string,
  columnId: string
) => {
  const task = await getTaskId(new ObjectId(taskId));
  const workspaceId = task.workspace;
  const workspace = await getWorkspaceById(workspaceId);
  const isColumnIdIncluded = workspace.columns
    .map((column: WorkspaceColumn) => column._id.toString())
    .includes(columnId);
  if (!isColumnIdIncluded) {
    throw new CustomError(
      "column id ins't included with the same workspace",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
  const res = await updateColumnId(
    new ObjectId(taskId),
    new ObjectId(columnId)
  );
  console.log("update it successfully");
  // revalidateTag("tasks");
};

export const updateColumnsOrder = async (
  workspaceId: string,
  newColumns: WorkspaceColumn[]
) => {
  try {
    const result = await Workspace.updateMany(
      { _id: workspaceId },
      {
        $set: { columns: newColumns },
      }
    );
    console.log("Columns updated successfully:", result);
  } catch (error) {
    throw new Error("Error updating columns");
  }
};

export const handleDeleteTask = async (id: string) => {
  await deleteTask(new ObjectId(id));
  revalidateTag("tasks");
};

export const redirectServer = (workspaceId: string) => {
  redirect(`/workspaces/${workspaceId}`);
};
