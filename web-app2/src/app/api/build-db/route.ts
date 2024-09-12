import { NextResponse } from "next/server";
import { connectDB, execute } from "../../../../test-data/seeds";
import mongoose from "mongoose";
import fs from "fs";
import path from "node:path";
const filePath = "./web-app2/test-data/seeds/users100.json";
const dirPath = path.dirname(filePath);

export async function POST(request: Request) {
  // const data = await request.json();
  // connectDB().then(() => execute().then(() => mongoose.disconnect()));
  await connectDB();
  const users = await execute();
  await mongoose.disconnect();

  return NextResponse.json({ message: "created" }, { status: 200 });
}
