import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";
import FullPageCalendar from "@/app/(app)/calendars/components/FullPageCalendar";
import WorkspaceTabs from "@/app/(app)/calendars/components/WorkspaceTabs";

Page.propTypes = {};

function Page() {
  return (
    <div>
      <Navbar>
        <div>
          <p className="text-2xl">calendars</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <div className="w-full h-full bg-white flex flex-col flex-grow p-4 rounded space-y-2">
        <Suspense fallback={<p>loading ...</p>}>
          <WorkspaceTabs />
        </Suspense>
        <FullPageCalendar />
      </div>
    </div>
  );
}

export default Page;
