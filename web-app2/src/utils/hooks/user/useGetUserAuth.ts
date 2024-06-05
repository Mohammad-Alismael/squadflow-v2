"use client";
import { useQuery, UseQueryResult } from "react-query";
import { getAuthUser } from "@/lib/api/user";
export type result = {
  username: string;
  email: string;
  photoURL: string;
};
export const useGetUserAuth = () => {
  return useQuery<result, Error>({
    queryKey: ["user-auth"],
    enabled: true,
    refetchOnWindowFocus: false,
    queryFn: () => getAuthUser(),
  }) as UseQueryResult<result, Error>;
};
