"use client";
import { useQuery, UseQueryResult } from "react-query";
import { getAuthUser, getUserById } from "@/lib/api/user";
export type result = {
  username: string;
  email: string;
  photoURL: string;
};
export const useGetUserById = (uid: string) => {
  return useQuery<result, Error>({
    queryKey: [`user-${uid}`],
    enabled: true,
    refetchOnWindowFocus: false,
    queryFn: () => getUserById(uid),
  }) as UseQueryResult<result, Error>;
};
