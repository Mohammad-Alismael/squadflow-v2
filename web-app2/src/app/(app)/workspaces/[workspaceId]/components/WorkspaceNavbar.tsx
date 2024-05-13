import React from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  return (
    <Navbar>
      <div>
        <p className="text-2xl">{data?.title}</p>
        <div className="flex items-center gap-2">
          {data &&
            data?.participants.map((participant) => (
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>{participant.user}</AvatarFallback>
              </Avatar>
            ))}
        </div>
      </div>
    </Navbar>
  );
}

export default WorkspaceNavbar;
