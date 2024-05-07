import UserInfo from "@/components/UserInfo";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CurrentTaskList from "@/app/(app)/dashboard/components/CurrentTaskList";
import TodayTasksDeadlines from "@/app/(app)/dashboard/components/TodayTasksDeadlines";
import AssignedTasks from "@/app/(app)/dashboard/components/AssignedTasks";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <Navbar>
        <div>
          <p className="text-2xl">Hello, mohammad alismael</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="flex-grow">
        <div className="w-4/6 h-full float-left pr-4">
          <CurrentTaskList />
        </div>
        <div className="w-2/6 h-full float-right space-y-4">
          <TodayTasksDeadlines />
          <AssignedTasks />
        </div>
      </div>
    </div>
  );
}
