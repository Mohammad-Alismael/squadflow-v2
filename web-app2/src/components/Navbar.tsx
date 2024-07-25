import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "react-feather";
import { Input } from "@/components/ui/input";
import SearchDialog from "@/components/Dialogs/SearchDialog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";
async function Navbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const { payload } = await verifyJWTToken(cookie.value);

  return (
    <Suspense fallback={<Skeleton className="h-12 w-full" />}>
      <div className="w-full flex flex-wrap items-start justify-between py-2">
        {children}
        <div className="flex items-center justify-between gap-2">
          <Bell
            size={30}
            className="p-1 bg-white rounded-xl h-[36px] w-[36px]"
          />
          <Link href="/settings">
            <Avatar>
              <AvatarImage src={payload?.photoURL as string} />
              <AvatarFallback>
                {payload?.username ? payload?.username?.substring(0, 2) : "PD"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </Suspense>
  );
}

export default Navbar;
