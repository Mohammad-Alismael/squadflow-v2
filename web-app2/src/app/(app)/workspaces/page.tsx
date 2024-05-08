import React from "react";
import Header from "@/app/(app)/workspaces/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import Workspace from "@/app/(app)/workspaces/components/Workspace";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const fetchWorkspaces = async () => {
  const res = await fetch("http://localhost:3000/api/workspaces", {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    cache: "no-cache",
  });
  if (res.ok) {
    return res.json();
  }
  return [];
};
async function Page() {
  const data: IWorkspace[] = await fetchWorkspaces();
  console.log(data);
  return (
    <div className="h-full flex flex-col">
      <Navbar>
        <div>
          <p className="text-2xl">Workspaces</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="flex-grow">
        <Header />
        {data.length === 0 && <NoWorkspacesFound />}
        <div className="py-4 h-[91%] grid grid-cols-4 grid-rows-2 gap-4 overflow-y-auto">
          {data.map((val) => {
            return <Workspace data={val} key={val.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
