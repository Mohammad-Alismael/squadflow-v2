import React from "react";
import { fetchTasksForCalendar } from "@/utils/actions/workspace-actions";
import FullPageCalendar from "@/app/(app)/calendars/components/FullPageCalendar";

async function CalendarWrapper({ workspaceId }: { workspaceId: string }) {
  const data = await fetchTasksForCalendar(workspaceId);
  const parsedData = data.filter((_) => _.dueDate);
  return (
    <div className="bg-white h-[87vh] p-4 rounded-xl">
      <FullPageCalendar eventsProps={JSON.parse(JSON.stringify(parsedData))} />
    </div>
  );
}

export default CalendarWrapper;
