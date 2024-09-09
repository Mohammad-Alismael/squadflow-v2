import { useQuery, UseQueryResult } from "react-query";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaceById } from "@/lib/api/workspace";
import { fetchWorkspace } from "@/utils/actions/workspace-actions";
interface PropTypes {
  id: string;
  enabled: boolean;
}
export const useGetWorkspaceById = (id: PropTypes["id"]) => {
  return useQuery<IWorkspace, Error>({
    queryKey: [id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    queryFn: () => fetchWorkspace(id) as unknown as IWorkspace,
  }) as UseQueryResult<IWorkspace, Error>;
};
