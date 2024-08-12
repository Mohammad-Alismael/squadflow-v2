import AuthForm from "@/components/AuthForm";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
export default async function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AuthForm />
    </main>
  );
}
