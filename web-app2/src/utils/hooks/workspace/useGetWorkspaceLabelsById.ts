import { useQuery, UseQueryResult } from "react-query";
import {
  WorkspaceColumn,
  WorkspaceLabel,
  WorkspaceParticipants,
} from "@/utils/@types/workspace";
import {
  fetchWorkspaceColumns,
  fetchWorkspaceLabels,
  fetchWorkspaceParticipants,
} from "@/lib/api/workspace";
interface PropTypes {
  id: string;
  details: boolean;
  enabled: boolean;
}
export const useGetWorkspaceLabelsById = (
  id: PropTypes["id"],
  enabled = true
) => {
  return useQuery<WorkspaceLabel[], Error>({
    queryKey: [`labels-${id}`],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchWorkspaceLabels(id),
  }) as UseQueryResult<WorkspaceLabel[], Error>;
};
