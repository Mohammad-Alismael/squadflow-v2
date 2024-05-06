import Image from "next/image";
import logo from "../../public/squadflow-v2-logo.png";
import Link from "next/link";
import { linkType } from "@/utils/@types/types";
import SidebarLink from "@/components/SidearLink";

const links: linkType[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Teams", icon: "Users", link: "/collaboration" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <div className="bg-white float-left h-full w-1/6 flex flex-col gap-4 p-5">
      <Link className="flex items-center gap-2" href="/dashboard">
        <Image src={logo} alt="logo" priority width={50} height={50} />
        <span className="text-3xl font-bold capitalize">squadflow</span>
      </Link>
      {links.map((link, i) => (
        <SidebarLink key={i} link={link} />
      ))}
    </div>
  );
};

export default Sidebar;
