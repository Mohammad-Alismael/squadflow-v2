"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { parseDate } from "@/utils/helper-date";

export function DatePicker() {
  const [date, setDate] = useState<Date | "" | null>(null);
  const setTaskDate = useTaskPropertiesStore((state) => state.setTaskDate);
  const dueDate = useTaskPropertiesStore((state) => state.taskDate);

  useEffect(() => {
    setDate(convertDate(dueDate));
  }, [dueDate]);

  const handleOnSelect = (e: Date | undefined) => {
    if (!e) return;
    setTaskDate(e.toLocaleDateString("en-GB"));
    setDate(e);
  };

  const convertDate = (currentDate: string | undefined) => {
    console.log({ currentDate });
    if (!currentDate) return null;
    return parseDate(currentDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-40 md:w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
