import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import CurrentTaskList from "@/app/(app)/dashboard/components/CurrentTaskList";
import TodayTasksDeadlines from "@/app/(app)/dashboard/components/TodayTasksDeadlines";
import AssignedTasks from "@/app/(app)/dashboard/components/AssignedTasks";
import { cookies } from "next/headers";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const { payload } = await verifyJWTToken(cookie?.value);
  return (
    <div className="h-full flex flex-col">
      <Navbar>
        <div>
          <p className="text-2xl">Hello, {payload?.username}</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="flex-grow">
        <div className="w-2/3 h-full float-left pr-4">
          <CurrentTaskList />
        </div>
        <div className="w-1/3 h-full float-right flex flex-col gap-4">
          <TodayTasksDeadlines />
          <AssignedTasks />
        </div>
      </div>
    </div>
  );
}
