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
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import { parseDate } from "@/utils/helper-date";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ICalendarTask } from "@/utils/@types/task";

const localizer = dayjsLocalizer(dayjs);
type TEvent = {
  title: string;
  taskId: string;
  workspaceId: string;
  workspaceName: string;
  start: string | Date;
  end: string | Date;
};

function FullPageCalendar({
  eventsProps,
  rightComponent,
}: {
  eventsProps: ICalendarTask[];
  rightComponent?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [date, setDate] = useState<Date>(dayjs().toDate());
  const router = useRouter();
  const [events, setEvents] = useState<TEvent[]>([]);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSelectEvent = (event: TEvent) => {
    // router.push(pathname + "?" + createQueryString("taskId", event.taskId));
    router.push(`/task/${event.workspaceId}/${event.taskId}`);
  };
  const components: any = {
    event: ({ event }: EventProps<TEvent>) => {
      return (
        <div className="bg-green-700 p-2 rounded-xl">
          <span className="opacity-70">{event.workspaceName}</span>
          <p>{event.title}</p>
        </div>
      );
    },
  };

  const onPrevClick = useCallback(() => {
    setDate(dayjs(date).subtract(1, "M").toDate());
  }, [date]);

  const onNextClick = useCallback(() => {
    setDate(dayjs(date).add(1, "M").toDate());
  }, [date]);

  const onTodayClick = useCallback(() => {
    setDate(dayjs().toDate());
  }, []);

  const dateText = useMemo(() => {
    return dayjs(date).format("MMMM YYYY");
  }, [date]);

  useEffect(() => {
    const newEvents = eventsProps.map((item) => ({
      title: item.title,
      taskId: item._id,
      workspaceId: item.workspace._id,
      workspaceName: item.workspace.title,
      start: item.dueDate ? parseDate(item.dueDate) : "",
      end: item.dueDate ? parseDate(item.dueDate) : "",
    }));
    setEvents(newEvents);
  }, [JSON.stringify(eventsProps)]);

  return (
    <React.Fragment>
      {events.length === 0 && <NoWorkspacesFound className="h-full" />}
      {events.length !== 0 && (
        <>
          <div
            className={clsx(
              "flex flex-row gap-4 pb-2",
              rightComponent ? "justify-between" : "justify-end"
            )}
          >
            {rightComponent}
            <div className="flex flex-row gap-4 justify-end pb-2">
              <Button onClick={onTodayClick}>Today</Button>
              <div className="flex flex-row justify-center items-center border-[1px] rounded-md">
                <Button
                  onClick={onPrevClick}
                  variant="ghost"
                  size="icon"
                  className="p-2 rounded-full hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                  <span className="sr-only">Previous Month</span>
                </Button>
                <div className="py-2 w-auto justify-center items-center">
                  <p className="font-medium">{dateText}</p>
                </div>
                <Button
                  onClick={onNextClick}
                  variant="ghost"
                  size="icon"
                  className="p-2 rounded-full hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                  <span className="sr-only">Next Month</span>
                </Button>
              </div>
            </div>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor={(event) => {
              return new Date(event.start);
            }}
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            // eventPropGetter={eventPropGetter}
            defaultView={Views.MONTH}
            views={[Views.MONTH]}
            // style={{ height: "86vh" }}
            toolbar={false}
            components={components}
            date={date}
            onNavigate={setDate}
            showAllEvents={true}
          />
        </>
      )}
    </React.Fragment>
  );
}

export default FullPageCalendar;
