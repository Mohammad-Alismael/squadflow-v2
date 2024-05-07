import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "react-feather";
import { Input } from "@/components/ui/input";
import SearchDialog from "@/components/Dialogs/SearchDialog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
async function Navbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Skeleton className="h-12 w-full" />}>
      <div className="w-full flex items-start justify-between float-right py-4">
        {children}
        <div className="flex items-center justify-between gap-2">
          <SearchDialog>
            <Input
              type="text"
              className="w-96 h-[36px]"
              placeholder="search for anything ..."
            />
          </SearchDialog>
          <Bell
            size={30}
            className="p-1 bg-white rounded-xl h-[36px] w-[36px]"
          />
          <Link href="/settings">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </Suspense>
  );
}

export default Navbar;
