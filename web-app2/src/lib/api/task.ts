import { handleError } from "@/utils/helper";
import { cookies } from "next/headers";

export const createTask = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/tasks`,
    {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return res.json();
  } else await handleError(res);
};

export const fetchTasksForColumnId = async (
  workspaceId: string,
  columnId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks?columnId=${columnId}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};

export const fetchTasksForWorkspace = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${workspaceId}/tasks`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};
