import React, { Suspense } from "react";
import PropTypes from "prop-types";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BellIcon,
  CheckIcon,
  LockIcon,
  SettingsIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react";
import CommunitySection from "@/app/(app)/settings/sections/CommunitySection";

Page.propTypes = {};

function Page() {
  return (
    <div className="w-full">
      <Navbar>
        <div>
          <p className="text-2xl capitalize">settings</p>
          <p className="text-sm opacity-50">never try to give up.</p>
        </div>
      </Navbar>
      <Tabs className="flex-1" defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <LockIcon className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
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
                <Label htmlFor="name">Name</Label>
                <Input defaultValue="Pedro Duarte" id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input defaultValue="@peduarte" id="username" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input defaultValue="pedro@example.com" id="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="America/New_York">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">New York</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <CheckIcon className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <CheckIcon className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="notification-frequency">
                  Notification Frequency
                </Label>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <CheckIcon className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
