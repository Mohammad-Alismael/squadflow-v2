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

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = (await signIn("credentials", {
        username,
        password,
        redirect: false,
      })) as SignInResponse;

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderWithLogo />
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-800 w-full capitalize"
                onClick={handleSubmit}
              >
                login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-green-800 w-full capitalize">
                sign up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
  // return (
  //   <div className="bg-white shadow-lg p-5 rounded-lg">
  //     <h1 className="text-xl font-bold my-4">Login</h1>
  //     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
  //       <input
  //         onChange={(e) => setUsername(e.target.value)}
  //         type="text"
  //         placeholder="username"
  //       />
  //       <input
  //         onChange={(e) => setPassword(e.target.value)}
  //         type="password"
  //         placeholder="Password"
  //       />
  //       <Button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
  //         Login
  //       </Button>
  //       {error && (
  //         <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
  //           {error}
  //         </div>
  //       )}
  //
  //       <Link className="text-sm mt-3 text-right" href={"/register"}>
  //         Dont have an account? <span className="underline">Register</span>
  //       </Link>
  //     </form>
  //   </div>
  // );
}
