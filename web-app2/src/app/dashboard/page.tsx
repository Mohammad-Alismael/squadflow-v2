import UserInfo from "@/components/UserInfo";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="w-5/6 float-right p-4">
        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
          <Navbar />
        </Suspense>
      </div>
    </>
  );
}
