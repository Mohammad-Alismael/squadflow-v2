import React, { Suspense } from "react";
import { useRouter } from "next/router";

Page.propTypes = {};

function Page({ params }: { params: { workspaceId: string } }) {
  return (
    <>
      <p>this is workspace page{params.workspaceId}</p>
    </>
  );
}

export default Page;
