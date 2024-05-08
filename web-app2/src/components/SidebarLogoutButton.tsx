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
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
async function logout() {
  cookies().set("jwt", "", { expires: new Date(0) });
}
const SidebarLogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await logout();
        redirect("/auth");
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
