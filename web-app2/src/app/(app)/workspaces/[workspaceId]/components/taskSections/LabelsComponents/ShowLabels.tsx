"use client";
import React from "react";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import Label from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/LabelsComponents/Label";
import { shallow } from "zustand/shallow";

function ShowLabels({ showDeleteIcon }: { showDeleteIcon: boolean }) {
  const labels = useTaskPropertiesStore((state) => state.labels, shallow);
  return (
    <>
      {!!labels.length &&
        labels.map((item) => {
          return (
            <Label
              key={item._id.toString()}
              data={item}
              showDeleteIcon={!showDeleteIcon}
            />
          );
        })}
    </>
  );
}

export default ShowLabels;
