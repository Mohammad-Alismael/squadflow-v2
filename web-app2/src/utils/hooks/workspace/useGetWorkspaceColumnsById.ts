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
  onSuccess: (data: WorkspaceColumn[]) => void;
}
export const useGetWorkspaceColumnsById = (
  id: PropTypes["id"],
  onSuccess?: PropTypes["onSuccess"]
): UseQueryResult<WorkspaceColumn[], Error> => {
  console.log("useGetWorkspaceColumnsById - workspace ID:", id);

  return useQuery<WorkspaceColumn[], Error>({
    queryKey: [`columns-${id}`],
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    onSuccess,
    queryFn: () => fetchWorkspaceColumns(id),
  });
};
