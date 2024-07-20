"use server";
import { cookies } from "next/headers";
import {
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
  getTasksByWorkspaceIdForCalendar,
} from "@/lib/tasks";
import { ObjectId } from "mongodb";
import { getWorkspaceById } from "@/lib/workspace";

export const fetchWorkspaces = async () => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces?participated=true`,
    {
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};

export const fetchWorkspace = async (workspaceId: string) => {
  if (!workspaceId) return null;
  return await getWorkspaceById(new ObjectId(workspaceId));
};
export const getTasksForWorkspace = async (
  workspaceId: string,
  columnId?: string
) => {
  try {
    return columnId
      ? await getTasksByWorkspaceIdAndColumnId(
          new ObjectId(workspaceId),
          new ObjectId(columnId)
        )
      : await getTasksByWorkspaceId(new ObjectId(workspaceId));
  } catch (e) {
    console.log("tf", e);
    throw e;
  }
};

export const fetchTasksForCalendar = async (workspaceId: string) => {
  return (await getTasksByWorkspaceIdForCalendar(
    new ObjectId(workspaceId)
  )) as { title: string; workspace: string; _id: string; dueDate: string }[];
};
