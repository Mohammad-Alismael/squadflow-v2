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
