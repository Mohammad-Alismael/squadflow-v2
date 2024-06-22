"use server";
import { cookies } from "next/headers";
import { getTasksByWorkspaceIdForCalendar } from "@/lib/tasks";
import { ObjectId } from "mongodb";

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
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      next: { revalidate: 1 },
      method: "GET",
      headers: { Cookie: cookies().toString() },
    }
  );
  if (res.ok) {
    return res.json();
  }
  return null;
};
export const getTasksForWorkspace = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks`,
    {
      next: { tags: ["tasks"] },
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

export const fetchTasksForCalendar = async (workspaceId: string) => {
  return (await getTasksByWorkspaceIdForCalendar(
    new ObjectId(workspaceId)
  )) as { title: string; workspace: string; _id: string; dueDate: string }[];
};
