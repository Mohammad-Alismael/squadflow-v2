import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function WorkspaceSkeleton() {
  return (
    <Card className="p-2 space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-[140px] w-full rounded-xl" />
      <div className="flex flex-row gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <Skeleton className="h-8 w-full" />
    </Card>
  );
}

export default WorkspaceSkeleton;
