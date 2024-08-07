import { useQuery, UseQueryResult } from "react-query";
import { fetchCommunity } from "@/app/(app)/settings/requests";
import { CommunityResponse, ICommunity } from "@/utils/@types/community";

interface RESULT {
  data: CommunityResponse | null;
  status: number;
}
export const useGetCommunity = (enabled = true) => {
  return useQuery<RESULT, Error>({
    queryKey: [`community`],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchCommunity(),
  }) as UseQueryResult<RESULT, Error>;
};
