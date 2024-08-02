"use client";
import React, { useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetWorkspaceColumnsById } from "@/utils/hooks/workspace/useGetWorkspaceColumnsById";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import {
  IWorkspace,
  WorkspaceColumn,
  WorkspaceLabel,
} from "@/utils/@types/workspace";

const Workspace = ({ data }: { data: IWorkspace[] }) => {
  const setProjectId = useTaskPropertiesStore((state) => state.setProjectId);
  const projectId = useTaskPropertiesStore((state) => state.projectId);
  const setColumns = useTaskPropertiesStore((state) => state.setColumns);
  const setParticipants = useTaskPropertiesStore(
    (state) => state.setParticipants
  );
  const setWorkspaceLabels = useTaskPropertiesStore(
    (state) => state.setWorkspaceLabels
  );

  const handleValueChange = useCallback(
    (value: string) => {
      setColumns([]);
      setWorkspaceLabels([]);
      setParticipants([]);
      setProjectId(value);
      const selectedWorkspace = data.filter(
        (workspace) => workspace._id === value
      )[0];
      selectedWorkspace &&
        setColumns(selectedWorkspace.columns as WorkspaceColumn[]);
      selectedWorkspace &&
        setWorkspaceLabels(selectedWorkspace.labels as WorkspaceLabel[]);
    },
    [setProjectId]
  );

  return (
    <Select onValueChange={handleValueChange} defaultValue={projectId}>
      <SelectTrigger className="w-[160px] h-[41px] bg-gray-100">
        <SelectValue placeholder="Select workspace" />
      </SelectTrigger>
      <SelectContent>
        {data.map((workspace) => (
          <SelectItem key={workspace._id} value={workspace._id as string}>
            {workspace.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Workspace;
