"use client";
import Image from "next/image";
import logo from "../../public/squadflow-v2-logo.png";
import Link from "next/link";
import { linkType } from "@/utils/@types/types";
import SidebarLink from "@/components/SidearLink";
import React, { useState } from "react";
import SidebarLogoutButton from "./SidebarLogoutButton";

export const links: linkType[] = [
  { label: "Dashboard", icon: "Grid", link: "/dashboard" },
  { label: "Workspaces", icon: "Folder", link: "/workspaces" },
  {
    label: "Calendars",
    icon: "Calendar",
    link: "/calendars",
  },
  { label: "Messaging (firebase & redis)", icon: "Users", link: "/chats" },
  { label: "Messaging (my service)", icon: "Users", link: "/chats2" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <div className="relative bg-white float-left h-full hidden lg:w-1/6 lg:block pt-3 pb-5">
      <Link
        className="flex flex-row items-center gap-x-2.5 pl-4"
        href="/dashboard"
      >
        <Image src={logo} alt="logo" priority width={50} height={50} />
        <span className="text-sm xl:text-2xl font-bold capitalize">
          squadflow
        </span>
      </Link>

      <hr className="mb-1 mt-3" />
      <p className="opacity-50 mt-3 mb-1 mx-4 uppercase font-bold text-sm">
        overview
      </p>
      <div className="space-y-2 pl-4">
        {links.map((link, i) => (
          <SidebarLink key={i} link={link} />
        ))}
      </div>
      <SidebarLogoutButton />
    </div>
  );
};
export default Sidebar;
