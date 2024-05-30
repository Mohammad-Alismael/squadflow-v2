import { useQuery, UseQueryResult } from "react-query";
import { fetchWorkspaceById } from "@/app/(app)/dashboard/requests";
import { fetchCommunity } from "@/app/(app)/settings/requests";
import { CommunityResponse, ICommunity } from "@/utils/@types/community";
interface PropTypes {
  enabled: boolean;
}
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
