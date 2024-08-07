"use client";
import React from "react";
import PropTypes from "prop-types";
import { WorkspaceLabel } from "@/utils/@types/workspace";
import { Button } from "@/components/ui/button";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

Label.propTypes = {};

function Label({ data }: { data: WorkspaceLabel }) {
  const { addLabel, removeLabel } = useTaskPropertiesStore();
  const labels = useTaskPropertiesStore((state) => state.labels);
  const handleClick = () => {
    addLabel(data);
  };
  const handleClickRemove = () => {
    removeLabel(data);
  };
  const included = labels.map((item) => item._id).includes(data._id);

  return (
    <p
      onClick={included ? handleClickRemove : handleClick}
      className="inline px-4 py-2 rounded-full"
      style={{ backgroundColor: data.color }}
    >
      {data.title}
    </p>
  );
}

export default Label;
