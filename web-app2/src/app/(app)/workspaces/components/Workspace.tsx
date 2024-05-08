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

function Workspace({ data }: { data: IWorkspace }) {
  return (
    <Link href={`/workspaces/${data._id}`}>
      <Card className="">
        <CardHeader className="px-2 py-0 m-0 flex flex-row items-center justify-between">
          <CardTitle className="text-xl">{data.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <EllipsisVerticalIcon className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <div className="relative h-[160px] overflow-hidden rounded-t-lg">
          <Image
            alt="Project background"
            className="h-full w-full object-cover"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "400/200",
              objectFit: "cover",
            }}
            width="400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        </div>

        <CardContent>
          <div className="space-y-2">
            <div className="mt-4 flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/avatars/03.png" />
                <AvatarFallback>LW</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Progress value={75} className="bg-green-800" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                75%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Workspace;
