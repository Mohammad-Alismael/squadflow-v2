import { useQuery, UseQueryResult } from "react-query";
import { fetchCommunity } from "@/app/(app)/settings/requests";
import { CommunityResponse, ICommunity } from "@/utils/@types/community";
import { handleFetchCommunity } from "@/utils/actions/community-actions";

type RESULT = CommunityResponse | null;
export const useGetCommunity = (enabled = true) => {
  return useQuery<RESULT, Error>({
    queryKey: [`community`],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => handleFetchCommunity(),
  }) as UseQueryResult<RESULT, Error>;
};
