import React from "react";
import PropTypes from "prop-types";
import { redirect } from "next/navigation";

Page.propTypes = {};

function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string; taskId: string };
  searchParams?: { [key: string]: string };
}) {
  if (!params.workspaceId) return redirect(`/workspaces`);
  else return redirect(`/workspaces/${params.workspaceId}`);
  return (
    <div>
      <p>workspace id:{params.workspaceId}</p>
    </div>
  );
}

export default Page;
