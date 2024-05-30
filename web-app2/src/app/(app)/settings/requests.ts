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
