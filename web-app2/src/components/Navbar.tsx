import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "react-feather";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import SidebarMobile from "@/components/Sidebar-mobile";
async function Navbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const payload = await verifyJWTToken(cookie.value);

  return (
    <div className="w-full flex flex-wrap items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <SidebarMobile />
        {children}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Bell
          size={30}
          className="p-1 bg-white rounded-xl h-[36px] w-[36px] hidden sm:block"
        />
        <Link href="/settings">
          <Avatar>
            <AvatarImage src={payload?.photoURL as string} />
            <AvatarFallback>
              {payload?.username ? payload?.username.substring(0, 2) : "PD"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
