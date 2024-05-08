import React from "react";
import Header from "@/app/(app)/workspaces/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
import Workspace from "@/app/(app)/workspaces/components/Workspace";
import { redirect } from "next/navigation";
const fetchWorkspaces = async () => {
  const res = await fetch("http://localhost:3000/api/workspaces", {
    method: "POST",
    cache: "no-cache",
  });
  if (res.ok) {
    return res.json();
  }
  return [];
};
async function Page() {
  const data = await fetchWorkspaces();
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
        <div className="py-4 h-[91%] grid grid-cols-4 grid-rows-2 gap-4 overflow-y-auto">
          <Workspace />
          <Workspace />
          <Workspace />
          <Workspace />
          <Workspace />
          <Workspace />
        </div>
        {/*<NoWorkspacesFound />*/}
      </div>
    </div>
  );
}

export default Page;
