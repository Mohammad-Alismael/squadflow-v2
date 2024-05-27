import Image from "next/image";
import logo from "../../public/squadflow-v2-logo.png";
import Link from "next/link";
import { linkType } from "@/utils/@types/types";
import SidebarLink from "@/components/SidearLink";
import SidebarLogoutButton from "@/components/SidebarLogoutButton";

const links: linkType[] = [
  { label: "Dashboard", icon: "Grid", link: "/dashboard" },
  { label: "Workspaces", icon: "Folder", link: "/workspaces" },
  {
    label: "Calendars",
    icon: "Calendar",
    link: "/calendars",
  },
  { label: "Chats", icon: "Users", link: "/chats" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <div className="relative bg-white float-left h-full w-1/6 pl-4 py-5">
      <Link className="flex items-center gap-2.5" href="/dashboard">
        <Image src={logo} alt="logo" priority width={50} height={50} />
        <span className="text-2xl font-bold capitalize">squadflow</span>
      </Link>
      <div className="space-y-2 mt-4">
        {links.map((link, i) => (
          <SidebarLink key={i} link={link} />
        ))}
      </div>
      <SidebarLogoutButton />
    </div>
  );
};

export default Sidebar;
