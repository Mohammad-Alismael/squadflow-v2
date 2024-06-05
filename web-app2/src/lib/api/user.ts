export const getAuthUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_ROUTE}/api/users/getAuthUser`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return null;
};
