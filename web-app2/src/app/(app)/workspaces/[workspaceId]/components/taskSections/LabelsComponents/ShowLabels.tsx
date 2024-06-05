"use client";
import React from "react";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";

ShowLabels.propTypes = {};

function ShowLabels() {
  const label = useTaskPropertiesStore((state) => state.labels);
  return (
    <>
      {label.map((item) => {
        return <Label key={item._id} data={item} />;
      })}
    </>
  );
}

export default ShowLabels;
