import { useQuery, UseQueryResult } from "react-query";
import {
  WorkspaceColumn,
  WorkspaceParticipants,
} from "@/utils/@types/workspace";
import {
  fetchWorkspaceColumns,
  fetchWorkspaceParticipants,
} from "@/lib/api/workspace";
interface PropTypes {
  id: string;
  details: boolean;
  enabled: boolean;
}
export const useGetWorkspaceColumnsById = (
  id: PropTypes["id"],
  enabled = true
) => {
  return useQuery<WorkspaceColumn[], Error>({
    queryKey: [`columns-${id}`],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchWorkspaceColumns(id),
  }) as UseQueryResult<WorkspaceColumn[], Error>;
};
