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
  redirect(`/workspaces`);
}

export default Page;
