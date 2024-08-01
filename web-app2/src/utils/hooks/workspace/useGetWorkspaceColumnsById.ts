import { useQuery, UseQueryResult } from "react-query";
import {
  WorkspaceColumn,
  WorkspaceParticipants,
} from "@/utils/@types/workspace";
import {
  fetchWorkspaceColumns,
  fetchWorkspaceParticipants,
} from "@/lib/api/workspace";
import { handleGetColumns } from "@/utils/actions/workspace-actions";
interface PropTypes {
  id: string;
  details: boolean;
  enabled: boolean;
}
export const useGetWorkspaceColumnsById = (
  id: PropTypes["id"]
): UseQueryResult<WorkspaceColumn[], Error> => {
  console.log("useGetWorkspaceColumnsById - workspace ID:", id);

  return useQuery<WorkspaceColumn[], Error>({
    queryKey: [`columns-${id}`],
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("useGetWorkspaceColumnsById - onSuccess:", data);
    },
    queryFn: () => fetchWorkspaceColumns(id),
  });
};
