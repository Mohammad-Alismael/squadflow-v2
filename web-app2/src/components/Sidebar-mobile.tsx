"use client";
import React from "react";
import PropTypes from "prop-types";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import logo from "../../public/squadflow-v2-logo.png";
import Link from "next/link";
import SidebarLink from "@/components/SidearLink";
import SidebarLogoutButton from "@/components/SidebarLogoutButton";
import { links } from "@/components/Sidebar";

SidebarMobile.propTypes = {};

function SidebarMobile() {
  return (
    <div className="block lg:hidden">
      <Drawer direction="left">
        <DrawerTrigger className="bg-white rounded-full p-2">
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent className="py-4">
          <Link
            className="flex flex-row items-center gap-x-2.5 pl-4"
            href="/dashboard"
          >
            <Image src={logo} alt="logo" priority width={50} height={50} />
            <span className="sm:text-2xl text-sm font-bold capitalize">
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
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SidebarMobile;
