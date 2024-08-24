"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./custom-calendar-style.css";
import {
  Calendar,
  dayjsLocalizer,
  EventPropGetter,
  EventProps,
  Views,
} from "react-big-calendar";
const DragAndDropCalendar = withDragAndDrop(Calendar);

import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import { parseDate } from "@/utils/helper-date";
import TaskEvent from "@/app/(app)/calendars/components/TaskEvent";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = dayjsLocalizer(dayjs);
type TEvent = {
  title: string;
  taskId: string;
  workspaceId: string;
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
    // router.push(pathname + "?" + createQueryString("taskId", event.taskId));
    router.push(`/task/${event.workspaceId}/${event.taskId}`);
  };
  const components: any = {
    event: ({ event }: EventProps<TEvent>) => {
      return (
        <div className="bg-green-700 p-2 rounded-xl">
          <span className="opacity-70">workspace</span>
          <p>{event.title}</p>
        </div>
      );
    },
  };
  useEffect(() => {
    const newEvents = eventsProps.map((item) => ({
      title: item.title,
      taskId: item._id,
      workspaceId: item.workspace,
      start: item.dueDate ? parseDate(item.dueDate) : "",
      end: item.dueDate ? parseDate(item.dueDate) : "",
    }));
    setEvents(newEvents);
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
          // eventPropGetter={eventPropGetter}
          defaultView={Views.MONTH}
          views={[Views.MONTH]}
          style={{ height: "86vh" }}
          toolbar={false}
          components={components}
        />
      )}
    </div>
  );
}

export default FullPageCalendar;
