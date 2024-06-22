import React from "react";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

async function WorkspaceTabs() {
  const data: IWorkspace[] = await fetchWorkspaces();
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        {data.map((item) => (
          <Link href={`?workspace=${item._id}`} prefetch={false}>
            <TabsTrigger key={item._id} value={item.title as string}>
              {item.title}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default WorkspaceTabs;
