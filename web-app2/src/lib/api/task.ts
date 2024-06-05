import { handleError } from "@/utils/helper";

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
