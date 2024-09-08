import { useQuery, UseQueryResult } from "react-query";
import {
  WorkspaceColumn,
  WorkspaceLabel,
  WorkspaceParticipants,
} from "@/utils/@types/workspace";
import { getWorkspaceLabels } from "@/utils/actions/workspace-actions";

interface PropTypes {
  id: string;
  onSuccess: (data: WorkspaceLabel[]) => void;
}
export const useGetWorkspaceLabelsById = (
  id: PropTypes["id"],
  onSuccess?: PropTypes["onSuccess"]
) => {
  return useQuery<WorkspaceLabel[], Error>({
    queryKey: [`labels-${id}`],
    enabled: !!id,
    onSuccess,
    refetchOnWindowFocus: false,
    queryFn: () => getWorkspaceLabels(id),
  }) as UseQueryResult<WorkspaceLabel[], Error>;
};
