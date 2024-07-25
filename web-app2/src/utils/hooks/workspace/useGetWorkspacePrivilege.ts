import { useQuery, UseQueryResult } from "react-query";
import { WorkspaceParticipants } from "@/utils/@types/workspace";
import { getWorkspacePrivilege } from "@/utils/actions/workspace-actions";
interface PropTypes {
  id: string;
}
export const useGetWorkspacePrivilege = (
  id: PropTypes["id"],
  details = false
) => {
  return useQuery<string, Error>({
    queryKey: [`privilage-${id}`],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => getWorkspacePrivilege(id),
  }) as UseQueryResult<string, Error>;
};
