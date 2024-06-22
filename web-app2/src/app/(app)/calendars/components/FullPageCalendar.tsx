"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchTasksForCalendar } from "@/utils/actions/workspace-actions";
import { parseDate } from "@/utils/helper-date";
import TaskDetailsDialog from "@/components/Dialogs/TaskDetailsDialog";

const localizer = dayjsLocalizer(dayjs);

function FullPageCalendar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const workspaceId = searchParams.get("workspace");
  const taskId = searchParams.get("taskId");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(2024, 5, 20, 10, 0),
      end: new Date(2024, 5, 20, 11, 0),
    },
    {
      title: "Lunch Break",
      start: new Date(2024, 5, 20, 12, 0),
      end: new Date(2024, 5, 20, 13, 0),
    },
    {
      title: "Lunch Break2",
      start: new Date(2024, 5, 19, 12, 0),
      end: new Date(2024, 5, 21, 13, 0),
      color: "#00ff00",
    },
  ]);
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
    console.log(workspaceId);
    setLoading(true);
    workspaceId &&
      fetchTasksForCalendar(workspaceId)
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
  return (
    <div>
      {loading ? (
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
      ) : (
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
