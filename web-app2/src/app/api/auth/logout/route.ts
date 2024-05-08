// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const res = NextResponse.next();
  res.cookies.set({
    name: "jwt",
    value: "",
    httpOnly: true,
  });
  return res;
}
