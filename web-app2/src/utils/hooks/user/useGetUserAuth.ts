"use client";
import { useQuery, UseQueryResult } from "react-query";
import { handelGetUserAuth } from "@/utils/actions/user-actions";
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
    queryFn: () => handelGetUserAuth(),
  }) as UseQueryResult<result, Error>;
};
