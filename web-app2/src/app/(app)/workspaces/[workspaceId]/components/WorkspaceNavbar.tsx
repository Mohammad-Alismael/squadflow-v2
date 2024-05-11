import React from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

const fetchWorkspace = async (workspaceId: string) => {
  const res = await fetch(
    `${process.env.URL_API_ROUTE}/api/workspaces/${workspaceId}`,
    {
      method: "GET",
      headers: { Cookie: cookies().toString() },
      cache: "no-cache",
    }
  );
  if (res.ok) {
    return res.json();
  }
  return null;
};

async function WorkspaceNavbar({ workspaceId }: { workspaceId: string }) {
  const data: IWorkspace = await fetchWorkspace(workspaceId);
  console.log("workspace", data);
  return (
    <Navbar>
      <div>
        <p className="text-2xl">{data.title}</p>
        <p className="text-sm opacity-50">never try to give up.</p>
      </div>
    </Navbar>
  );
}

export default WorkspaceNavbar;
