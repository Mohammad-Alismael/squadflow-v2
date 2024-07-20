import React from "react";
import PropTypes from "prop-types";
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
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import PasswordForm from "@/app/(app)/settings/components/PasswordForm";

function SecuritySection() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PasswordForm />
      </CardContent>
    </Card>
  );
}

export default SecuritySection;
