"use client";
import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";

function Dates() {
  const { setEndTime } = useTaskPropertiesStore();

  return (
    <div className="flex flex-row items-center justify-between gap-x-2">
      <div className="flex flex-col gap-1 w-1/2">
        <Label className="capitalize text-md font-bold">due date</Label>
        <DatePicker />
      </div>
      <div className="flex flex-col gap-1 w-1/2">
        <Label className="capitalize text-md font-bold">due time</Label>
        <Input
          type="time"
          className=""
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Dates;
