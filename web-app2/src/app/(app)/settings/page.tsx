import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BellIcon,
  CheckIcon,
  LockIcon,
  SettingsIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react";
import CommunitySection from "@/app/(app)/settings/sections/CommunitySection";
import GeneralSection from "@/app/(app)/settings/sections/GeneralSection";
import SecuritySection from "@/app/(app)/settings/sections/SecuritySection";
import { Skeleton } from "@/components/ui/skeleton";

Page.propTypes = {};

function Page() {
  // i'm planning to add notification system for tasks deadline and assgiment

  return (
    <div className="w-full">
      <Navbar>
        <div>
          <p className="text-2xl capitalize">settings</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <Tabs className="flex-1" defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <LockIcon className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          {/*<TabsTrigger value="notifications">*/}
          {/*  <BellIcon className="mr-2 h-4 w-4" />*/}
          {/*  Notifications*/}
          {/*</TabsTrigger>*/}
          <TabsTrigger value="community">
            <UsersIcon className="mr-2 h-4 w-4" />
            Community
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general account settings.
              </CardDescription>
            </CardHeader>
            <GeneralSection />
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <SecuritySection />
        </TabsContent>
        {/*<TabsContent value="notifications">*/}
        {/*  <Card className="h-full">*/}
        {/*    <CardHeader>*/}
        {/*      <CardTitle>Notification Settings</CardTitle>*/}
        {/*      <CardDescription>*/}
        {/*        Manage your notification preferences.*/}
        {/*      </CardDescription>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent className="space-y-4">*/}
        {/*      <div className="space-y-1">*/}
        {/*        <Label htmlFor="notification-frequency">*/}
        {/*          Notification Frequency*/}
        {/*        </Label>*/}
        {/*        <Select defaultValue="daily">*/}
        {/*          <SelectTrigger className="w-full">*/}
        {/*            <SelectValue placeholder="Select frequency" />*/}
        {/*          </SelectTrigger>*/}
        {/*          <SelectContent>*/}
        {/*            <SelectItem value="realtime">Real-time</SelectItem>*/}
        {/*            <SelectItem value="hourly">Hourly</SelectItem>*/}
        {/*            <SelectItem value="daily">Daily</SelectItem>*/}
        {/*            <SelectItem value="weekly">Weekly</SelectItem>*/}
        {/*          </SelectContent>*/}
        {/*        </Select>*/}
        {/*      </div>*/}
        {/*    </CardContent>*/}
        {/*    <CardFooter>*/}
        {/*      <Button>*/}
        {/*        <CheckIcon className="mr-2 h-4 w-4" />*/}
        {/*        Save changes*/}
        {/*      </Button>*/}
        {/*    </CardFooter>*/}
        {/*  </Card>*/}
        {/*</TabsContent>*/}
        <TabsContent value="community">
          <Suspense fallback={<p>loading ...</p>}>
            <CommunitySection />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
