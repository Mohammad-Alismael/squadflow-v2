import React from "react";
import PropTypes from "prop-types";
import { redirect } from "next/navigation";

Page.propTypes = {};

function Page({
  params,
  searchParams,
}: {
  params: { columnId: string; workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  if (!params.columnId) return redirect(`/workspaces`);
  else return redirect(`/workspaces/${params.workspaceId}`);
}

export default Page;
