"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchTasksForCalendar } from "@/utils/actions/workspace-actions";
import { parseDate } from "@/utils/helper-date";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";

const localizer = dayjsLocalizer(dayjs);

function FullPageCalendar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const workspaceId = searchParams.get("workspace");
  const taskId = searchParams.get("taskId");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const eventPropGetter = (event: { color: string; textColor: string }) => {
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
  const handleNavigate = (date, view) => {
    setCurrentDate(date);
  };

  const handleSelectEvent = (event) => {
    router.push(pathname + "?" + createQueryString("taskId", event.taskId));
  };
  useEffect(() => {
    setLoading(true);
    fetchTasksForCalendar(workspaceId as string)
      .then((r) => {
        const rest = r.map((item) => ({
          title: item.title,
          taskId: item._id,
          workspaceId: item.workspace,
          start: item.dueDate ? parseDate(item.dueDate) : "",
          end: item.dueDate ? parseDate(item.dueDate) : "",
        }));
        setEvents(rest);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [workspaceId]);
  // @ts-ignore
  return (
    <div>
      {!loading && events.length === 0 && (
        <NoWorkspacesFound className="h-full" />
      )}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
          }}
        >
          {/*<CircularProgress />*/}
          <p>loading ...</p>
        </div>
      )}
      {!loading && events.length !== 0 && (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
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
      {workspaceId && taskId && (
        <TaskDetailsDialog
          workspaceId={workspaceId}
          revertBackTo={`/calendars?workspace=${workspaceId}`}
        />
      )}
    </div>
  );
}

export default FullPageCalendar;
