"use client";
import React, { ReactNode, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "react-query";
import { useGetTasksById } from "@/utils/hooks/task/useGetTasksById";
import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import Assignees from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Assignees";
import Priority from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Priority";
import Column from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Column";
import Labels from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Labels";
import Deadlines from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Deadlines";
import Description from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentContainer from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/comments/CommentContainer";
import { useTaskPropertiesStore } from "@/utils/store/taskPropertiesStore";
import { Skeleton } from "@/components/ui/skeleton";

function TaskDetailsDialogSkeleton() {
  return (
    <div className="p-0 w-4/5 h-[80%]">
      <div className="w-full flex flex-row">
        <div className="w-1/2 p-4 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex flex-row items-center justify-between gap-x-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-1/2 p-4 bg-[#FBFAF8]">
          <Tabs defaultValue="account" className="w-full h-[95%]">
            <TabsList className="w-full">
              <TabsTrigger
                value="account"
                className="w-1/2 capitalize data-[state=active]:bg-[#63AA7E]"
              >
                comments
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="w-1/2 capitalize data-[state=active]:bg-[#63AA7E]"
              >
                activity
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="h-full">
              <div className="relative h-full flex flex-col gap-2">
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
                  <Skeleton className="h-10 w-10 aspect-square rounded-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-[100px]" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="password">coming soon</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsDialogSkeleton;
