"use client";
import { useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import HeaderWithLogo from "@/components/HeaderWithLogo";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import { signup } from "@/app/auth/actions";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [tab, setTab] = useState("login");

  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTab("login");
    try {
      setLoading(true);
      setError("");
      const res = (await signIn("credentials", {
        username,
        password,
        redirect: false,
      })) as SignInResponse;
      if (res.status === 401) {
        setError("Invalid Credentials");
        return;
      }

      if (res.ok) {
        router.replace("dashboard");
        setError("");
      }
    } catch (error) {
      console.log(error.value);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTab("signup");
    try {
      setError("");
      setLoading(true);
      setSuccess(false);
      await signup(username, email, password);
      setError("");
      setSuccess(true);
    } catch (error) {
      setError(error.message);
      console.log(error.value);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <HeaderWithLogo />
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {error !== "" && tab === "login" && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Invalid Credentials</AlertTitle>
                  <AlertDescription>
                    your credentials aren't correct, please try again
                  </AlertDescription>
                </Alert>
              )}
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="passowrd"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <CustomButton
                onClick={handleSubmitLogin}
                loading={loading}
                title="submit"
              />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {success && tab === "signup" && (
                <Alert className="border-green-600">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="capitalize text-green-600">
                    created account successfully.
                  </AlertTitle>
                  <AlertDescription>
                    now, you can login with your account.
                  </AlertDescription>
                </Alert>
              )}
              {error !== "" && tab === "signup" && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Invalid Credentials</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <CustomButton
                onClick={handleSubmitSignup}
                loading={loading}
                title="sign up"
              />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
