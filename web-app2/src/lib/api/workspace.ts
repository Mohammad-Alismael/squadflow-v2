export const fetchWorkspaceParticipants = async (
  id: string,
  details: boolean
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${id}/participants?details=${details}`,
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

export const fetchWorkspaceColumns = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${id}/columns`,
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

export const createWorkspaceLabel = async (
  id: string,
  data: { color: string; title: string }
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${id}/labels`,
    {
      method: "PATCH",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return res.json();
  }
  return [];
};

export const fetchWorkspaceLabels = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${id}/labels`,
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

export const fetchWorkspaces = async () => {
  const res = await fetch(`${process.env.URL_API_ROUTE}/api/workspaces`, {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  });
  if (res.ok) {
    return res.json();
  }
  return [];
};

export const fetchWorkspaceById = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );
  if (res.status === 200) {
    return await res.json();
  }
};
