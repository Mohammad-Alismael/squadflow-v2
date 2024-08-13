import React from "react";
import { IWorkspace } from "@/utils/@types/workspace";
import { fetchWorkspaces } from "@/utils/actions/workspace-actions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import SelectWorkspace from "@/app/(app)/calendars/components/SelectWorkspace";

async function WorkspaceTabs() {
  const data: IWorkspace[] = await fetchWorkspaces();
  return (
    <React.Fragment>
      <Tabs className="w-full hidden md:block">
        <TabsList>
          {data.map((item) => (
            <Link
              key={item._id}
              href={`?workspace=${item._id}`}
              prefetch={false}
            >
              <TabsTrigger value={item.title as string}>
                {item.title}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
      <div className="block md:hidden">
        <SelectWorkspace data={JSON.parse(JSON.stringify(data))} />
      </div>
    </React.Fragment>
  );
}

export default WorkspaceTabs;
