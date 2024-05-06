import Image from "next/image";
import logo from "../../public/squadflow-v2-logo.png";
import Link from "next/link";
import { linkType } from "@/utils/@types/types";
import SidebarLink from "@/components/SidearLink";

const links: linkType[] = [
  { label: "Dashboard", icon: "Grid", link: "/dashboard" },
  { label: "Workspaces", icon: "Grid", link: "/workspaces" },
  {
    label: "Calendar",
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
    <div className="relative bg-white float-left h-full w-1/6 p-5">
      <Link className="flex items-center gap-2" href="/dashboard">
        <Image src={logo} alt="logo" priority width={50} height={50} />
        <span className="text-2xl font-bold capitalize">squadflow</span>
      </Link>
      <div className="space-y-4 mt-8">
        {links.map((link, i) => (
          <SidebarLink key={i} link={link} />
        ))}
      </div>
      <div className="w-full absolute bottom-2 left-0 border-t-2 p-2">
        <SidebarLink
          link={{
            label: "Logout",
            icon: "LogOut",
            link: "/logout",
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
