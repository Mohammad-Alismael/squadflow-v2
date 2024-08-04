import { useQuery, UseQueryResult } from "react-query";
import {
  fetchCommunity,
  fetchCommunityParticipants,
} from "@/app/(app)/settings/requests";
import { PopulatedUser } from "@/utils/@types/user";
interface PropTypes {
  workspaceId: string;
  enabled: boolean;
}
interface RESULT {
  _id: string;
  user: PopulatedUser;
  role: string;
}
export const useGetCommunityParticipants = (
  workspaceId: string,
  enabled = true
) => {
  return useQuery<RESULT, Error>({
    queryKey: [`community-participants`],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchCommunityParticipants(workspaceId),
  }) as UseQueryResult<RESULT, Error>;
};
