"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
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
    <div className="grid place-items-center h-screen">
      <div className="bg-white shadow-lg p-5 rounded-lg">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Dont have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
