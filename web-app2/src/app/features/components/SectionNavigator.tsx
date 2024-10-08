import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

SectionNavigator.propTypes = {};

function SectionNavigator() {
  return (
    <div className="sticky top-4 bg-white hidden md:block w-1/3 h-fit rounded-lg shadow-lg p-4 transition-shadow duration-200 ease-in-out">
      <h4 className="font-bold text-2xl capitalize text-gray-800 mb-2 border-b-2 border-gray-200 pb-2">
        Sections
      </h4>
      <div className="flex flex-col space-y-3 px-4">
        <Link
          href="#dashboard"
          className="text-gray-600 hover:text-green-800 transition-colors duration-200 ease-in-out"
        >
          Dashboard
        </Link>
        <Link
          href="#workspace"
          className="text-gray-600 hover:text-green-800 transition-colors duration-200 ease-in-out"
        >
          Workspace
        </Link>
        <Link
          href="#calendar"
          className="text-gray-600 hover:text-green-800 transition-colors duration-200 ease-in-out"
        >
          Calendar
        </Link>
        <Link
          href="#chats"
          className="text-gray-600 hover:text-green-800 transition-colors duration-200 ease-in-out"
        >
          Chats
        </Link>
        <Link
          href="#community"
          className="text-gray-600 hover:text-green-800 transition-colors duration-200 ease-in-out"
        >
          Community
        </Link>
      </div>
    </div>
  );
}

export default SectionNavigator;
