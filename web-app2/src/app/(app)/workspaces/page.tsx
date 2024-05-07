import React from "react";
import Header from "@/app/(app)/workspaces/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import NoWorkspacesFound from "@/app/(app)/workspaces/components/NoWorkspacesFound";
function Page() {
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
        <NoWorkspacesFound />
      </div>
    </div>
  );
}

export default Page;
