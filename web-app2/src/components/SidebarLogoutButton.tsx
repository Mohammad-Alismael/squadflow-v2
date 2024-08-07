import React from "react";
import clsx from "clsx";
import {
  Settings,
  User,
  Grid,
  Calendar,
  Users,
  LogOut,
  Folder,
} from "react-feather";
import { handleLogout } from "@/utils/actions/dashboard-actions";

const SidebarLogoutButton = () => {
  return (
    <form
      className="w-full absolute bottom-2 left-0 border-t-2 pt-1"
      action={async () => {
        handleLogout();
      }}
    >
      <button
        className={clsx(
          "p-2 flex items-center hover:text-green-700 transition duration-200 ease-in-out"
        )}
      >
        <LogOut
          size={28}
          className={clsx(
            "hover:stroke-green-700 transition duration-200 ease-in-out"
          )}
        />
        <span
          className={clsx(
            "px-4 hover:text-green-700 transition duration-200 ease-in-out"
          )}
        >
          logout
        </span>
      </button>
    </form>
  );
};

export default SidebarLogoutButton;
