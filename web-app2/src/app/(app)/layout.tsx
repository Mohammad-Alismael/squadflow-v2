import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isJWTTokenExpired, verifyJWTToken } from "@/lib/helper/route.helper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Squadflow",
  description: "Generated by create next app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Sidebar />
      <div className="h-full w-5/6 float-right px-4">{children}</div>
    </div>
  );
}
