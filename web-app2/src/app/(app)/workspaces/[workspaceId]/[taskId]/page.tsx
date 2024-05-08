import React, { Suspense } from "react";
import { useRouter } from "next/router";

Page.propTypes = {};

function Page({ params }: { params: { taskId: string } }) {
  return (
    <>
      <p>this is workspace page{params.taskId}</p>
    </>
  );
}

export default Page;
