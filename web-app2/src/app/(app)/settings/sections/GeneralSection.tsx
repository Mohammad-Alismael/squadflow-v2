import React from "react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { redirect } from "next/navigation";
GeneralSection.propTypes = {};
async function GeneralSection() {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const { payload } = await verifyJWTToken(cookie.value);
  return (
    <CardContent className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="profile-picture">Profile Picture</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>PD</AvatarFallback>
          </Avatar>
          <Button variant="outline">
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload new photo
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input defaultValue={payload?.username ?? ""} id="username" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input defaultValue={payload?.email ?? ""} id="email" />
      </div>
    </CardContent>
  );
}

export default GeneralSection;
