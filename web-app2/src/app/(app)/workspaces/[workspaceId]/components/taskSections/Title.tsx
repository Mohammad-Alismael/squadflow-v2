"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useTaskPropertiesStore,
  useTaskSelectors,
} from "@/utils/store/taskPropertiesStore";

function Title() {
  const { setTitle } = useTaskPropertiesStore();
  const taskSelectors = useTaskSelectors(useTaskPropertiesStore);

  const title = taskSelectors.getTitle();
  const [isEditModeOn, setEditModeOn] = useState(false);

  const handleEnterPress = (event: {
    target: { value: string };
    key: string;
  }) => {
    setTitle(event.target.value);
    if (event.key === "Enter") {
      setEditModeOn(false);
    }
  };
  const handleClickT = () => {
    setEditModeOn(true);
  };
  return (
    <>
      {!isEditModeOn ? (
        <h4 onClick={handleClickT} className="capitalize font-bold text-2xl">
          {title}
        </h4>
      ) : (
        <Input
          type="text"
          onKeyPress={handleEnterPress}
          defaultValue={title === "" ? "task title" : title}
        />
      )}
    </>
  );
}

export default Title;
