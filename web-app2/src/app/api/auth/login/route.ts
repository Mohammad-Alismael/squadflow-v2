import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUser, login } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    await login(username, password);
    return NextResponse.json(
      { message: "logged in successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
