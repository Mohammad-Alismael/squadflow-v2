import { handleError } from "@/utils/helper";
import { cookies } from "next/headers";
import { TaskResponse } from "@/utils/@types/task";

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

export const getTaskById = async (taskId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/tasks/${taskId}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  } else await handleError(res);
};

export const updateTaskById = async (taskId: string, data: any) => {
  console.log({ taskId, data });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/tasks/${taskId}`,
    {
      method: "PUT",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return res.json();
  } else await handleError(res);
};

export const postCommentByTaskId = async (taskId: string, text: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/tasks/${taskId}/comments`,
    {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({ text }),
    }
  );
  if (res.ok) {
    return res.json();
  } else await handleError(res);
};
