"use server";
import { cookies } from "next/headers";

export const fetchCommunity = async () => {
  const res = await fetch(`${process.env.URL_API_ROUTE}/api/community`, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    cache: "no-cache",
  });

  if (res.ok) {
    return {
      status: 200,
      data: res.json(),
    };
  }
  return {
    status: res.status,
    data: null,
  };
};
