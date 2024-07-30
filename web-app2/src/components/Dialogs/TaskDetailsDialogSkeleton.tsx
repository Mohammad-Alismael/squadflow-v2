"use client";
import React, { ReactNode, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

function TaskDetailsDialogSkeleton() {
  return (
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
  );
}

export default TaskDetailsDialogSkeleton;
