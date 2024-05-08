// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  // cookies().delete("jwt");
  console.log(cookies().getAll());
  return NextResponse.json({ message: cookies().get("jwt") }, { status: 200 });
}
