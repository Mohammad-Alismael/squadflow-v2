import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUser, login } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    try {
      const user = await login(username, password);
      return NextResponse.json(user);
    } catch (error) {
      console.log("Error: ", error);
    }

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
