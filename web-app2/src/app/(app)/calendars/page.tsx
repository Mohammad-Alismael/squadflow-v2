import React from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/Navbar";

Page.propTypes = {};

function Page(props) {
  return (
    <div>
      <Navbar>
        <div>
          <p className="text-2xl">calendars</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      this is page for calendars
    </div>
  );
}

export default Page;
