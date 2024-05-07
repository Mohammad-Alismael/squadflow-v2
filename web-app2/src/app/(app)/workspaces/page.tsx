import React from "react";
import Header from "@/app/(app)/workspaces/components/Header";
import Navbar from "@/components/Navbar";
function Page() {
  return (
    <div>
      <Navbar>
        <div>
          <p className="text-2xl">Workspaces</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <Header />
    </div>
  );
}

export default Page;
