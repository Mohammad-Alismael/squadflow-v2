import { handleError } from "@/utils/helper";

export const fetchCommunity = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/community`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );
  if (res.status === 200) {
    return {
      status: 200,
      data: await res.json(),
    };
  }
  return {
    status: res.status,
    data: null,
  };
};

export const fetchCommunityParticipants = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/workspaces/${workspaceId}/participants`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );

  if (res.ok) return await res.json();
  else await handleError(res);
};
