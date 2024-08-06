import { useQuery, UseQueryResult } from "react-query";
import { WorkspaceParticipants } from "@/utils/@types/workspace";
import { fetchWorkspaceParticipants } from "@/lib/api/workspace";
interface PropTypes {
  id: string;
  details: boolean;
  enabled: boolean;
}
export const useGetWorkspaceParticipantsById = (
  id: PropTypes["id"],
  details = false
) => {
  return useQuery<WorkspaceParticipants[], Error>({
    queryKey: [`participants-${id}`],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => fetchWorkspaceParticipants(id, details),
  }) as UseQueryResult<WorkspaceParticipants[], Error>;
};
