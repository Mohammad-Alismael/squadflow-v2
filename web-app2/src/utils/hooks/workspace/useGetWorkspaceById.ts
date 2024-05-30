import { useQuery, UseQueryResult } from "react-query";
import { fetchWorkspaceById } from "@/app/(app)/dashboard/requests";
interface PropTypes {
  id: string;
  enabled: boolean;
}
export const useGetWorkspaceById = (id: PropTypes["id"], enabled = true) => {
  return useQuery<IWorkspace, Error>({
    queryKey: [id],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: () => fetchWorkspaceById(id),
  }) as UseQueryResult<IWorkspace, Error>;
};
