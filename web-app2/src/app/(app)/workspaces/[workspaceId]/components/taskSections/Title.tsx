"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { useShallow } from "zustand/react/shallow";

function Title() {
  const setTitle = useTaskPropertiesStore((state) => state.setTitle);
  const { title } = useTaskPropertiesStore(
    useShallow((state) => ({
      title: state.title,
    }))
  );
  const [isEditModeOn, setEditModeOn] = useState(false);

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // setTitle(event.target.value);
    if (event.key === "Enter") {
      setEditModeOn(false);
    }
  };
  const handleClickT = () => {
    setEditModeOn(true);
  };
  return (
    <div className="w-full">
      {!isEditModeOn ? (
        <h4
          onClick={handleClickT}
          className="capitalize font-bold text-xl md:text-2xl"
        >
          {title}
        </h4>
      ) : (
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full"
          onKeyPress={handleEnterPress}
          defaultValue={title === "" ? "task title" : title}
        />
      )}
    </div>
  );
}

export default Title;
