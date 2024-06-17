"use client";

import * as React from "react";
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
import { useEffect } from "react";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  const { setTaskDate } = useTaskPropertiesStore();
  const dueDate = useTaskPropertiesStore((state) => state.taskDate);

  useEffect(() => {
    setTaskDate(date?.toLocaleDateString("en-GB"));
  }, [date]);
  useEffect(() => {
    if (dueDate && dueDate !== "") {
      const [day, month, year] = dueDate.split("/");
      const dateObject: Date = new Date(year, month - 1, day);
      setDate(dateObject);
    }
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
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
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
