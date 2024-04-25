// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Task } from "";
import { models } from "mongoose";

export async function GET(request) {
  return NextResponse.json({ message: "Hello World map" }, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  const task = new models.Task(data);
  // Do whatever you want
  return NextResponse.json({ message: "Hello World map" }, { status: 200 });
}
