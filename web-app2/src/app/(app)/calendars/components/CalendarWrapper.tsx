import React from "react";
import { fetchTasksForCalendar } from "@/utils/actions/workspace-actions";
import { parseDate } from "@/utils/helper-date";
import FullPageCalendar from "@/app/(app)/calendars/components/FullPageCalendar";

async function CalendarWrapper({ workspaceId }: { workspaceId: string }) {
  const data = await fetchTasksForCalendar(workspaceId);
  const parsedData = data.filter((_) => _.dueDate);

  console.log(parsedData);
  return (
    <div className="bg-white h-full p-4">
      <FullPageCalendar eventsProps={JSON.parse(JSON.stringify(parsedData))} />
    </div>
  );
}

export default CalendarWrapper;
