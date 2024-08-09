"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar,
  dayjsLocalizer,
  EventPropGetter,
  Views,
} from "react-big-calendar";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import { parseDate } from "@/utils/helper-date";

const localizer = dayjsLocalizer(dayjs);
type TEvent = {
  title: string;
  taskId: string;
  start: string | Date;
  end: string | Date;
};
type E = {
  _id: string;
  workspace: string;
  title: string;
  dueDate: string;
};
function FullPageCalendar({ eventsProps }: { eventsProps: E[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [events, setEvents] = useState<TEvent[]>([]);
  const eventPropGetter = (event: any) => {
    const backgroundColor = event.color || "#2e7d32"; // Default color if none is specified
    const color = event.textColor || "#fff"; // Default text color if none is specified
    return { style: { backgroundColor, color } };
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectEvent = (event: TEvent) => {
    router.push(pathname + "?" + createQueryString("taskId", event.taskId));
  };
  useEffect(() => {
    const d = eventsProps.map((item) => ({
      title: item.title,
      taskId: item._id,
      workspaceId: item.workspace,
      start: item.dueDate ? parseDate(item.dueDate) : "",
      end: item.dueDate ? parseDate(item.dueDate) : "",
    }));
    setEvents(d);
  }, [JSON.stringify(eventsProps)]);

  // return <div>{JSON.stringify(events)}</div>;
  return (
    <div>
      {events.length === 0 && <NoWorkspacesFound className="h-full" />}
      {events.length !== 0 && (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => {
            return new Date(event.start);
          }}
          endAccessor="end"
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventPropGetter}
          defaultView={Views.MONTH}
          views={[Views.MONTH]}
          style={{ height: "86vh" }}
        />
      )}
    </div>
  );
}

export default FullPageCalendar;
