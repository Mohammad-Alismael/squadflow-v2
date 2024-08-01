"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { shallow } from "zustand/shallow";

function Description() {
  const setDescription = useTaskPropertiesStore(
    (state) => state.setDescription
  );
  const description = useTaskPropertiesStore(
    (state) => state.description,
    shallow
  );
  return (
    <div className="space-y-2">
      <Label className="capitalize text-md font-bold">description</Label>
      <Textarea
        defaultValue={description}
        placeholder="Type your message here."
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

export default Description;
