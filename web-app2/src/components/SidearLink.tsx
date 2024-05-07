"use client";
import Link from "next/link";
import {
  Settings,
  User,
  Grid,
  Calendar,
  Users,
  LogOut,
  Folder,
} from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { linkType } from "@/utils/@types/types";

const icons = {
  Settings,
  User,
  Grid,
  Calendar,
  Users,
  LogOut,
  Folder,
};

const SidebarLink = ({ link }: { link: linkType }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  // @ts-ignore
  const IconComponent = icons[link.icon];
  return (
    <Link
      href={link.link}
      className="p-2 flex items-center hover:text-green-700 transition duration-200 ease-in-out"
    >
      <IconComponent
        size={28}
        className={clsx(
          "hover:stroke-green-700 transition duration-200 ease-in-out",
          isActive && "stroke-green-700"
        )}
      />
      <span
        className={clsx(
          "px-4 hover:text-green-700 transition duration-200 ease-in-out",
          isActive && "text-green-700"
        )}
      >
        {link.label}
      </span>
    </Link>
  );
};

export default SidebarLink;
