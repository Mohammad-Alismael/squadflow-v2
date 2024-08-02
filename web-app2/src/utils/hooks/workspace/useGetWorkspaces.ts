import { useQuery, UseQueryResult } from "react-query";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaceById, fetchWorkspaces } from "@/lib/api/workspace";
interface PropTypes {
  enabled: boolean;
}
export const useGetWorkspaces = (enabled = true) => {
  return useQuery<IWorkspace[], Error>({
    queryKey: ["workspaces"],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchWorkspaces(),
  }) as UseQueryResult<IWorkspace[], Error>;
};
