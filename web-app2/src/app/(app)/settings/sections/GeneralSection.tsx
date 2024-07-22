import React from "react";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { redirect } from "next/navigation";
import UploadProfile from "@/app/(app)/settings/components/UploadProfile";
import UpdateUserForm from "@/app/(app)/settings/components/UpdateUserForm";
async function GeneralSection() {
  const cookie = cookies().get("jwt");
  if (!cookie) redirect("/auth");
  const { payload } = await verifyJWTToken(cookie.value);

  return (
    <CardContent className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="profile-picture">Profile Picture</Label>
        <UploadProfile
          photoURL={payload?.photoURL as string}
          username={(payload?.username as string) ?? ""}
        />
      </div>
      <UpdateUserForm
        username={(payload?.username as string) ?? ""}
        email={(payload?.email as string) ?? ""}
      />
    </CardContent>
  );
}

export default GeneralSection;
