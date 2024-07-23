import React from "react";
import PropTypes from "prop-types";
import WorkspaceMenu from "@/app/(app)/workspaces/components/WorkspaceMenu";
import { IWorkspace } from "@/utils/@types/workspace";

WorkspaceList.propTypes = {};

function WorkspaceList({ data }: { data: IWorkspace }) {
  return (
    <div className="bg-white px-4 py-2 border-2 rounded flex items-center justify-between">
      <p>{data.title}</p>
      <WorkspaceMenu workspaceId={data._id as string} />
    </div>
  );
}

export default WorkspaceList;
