import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUser } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const foundUser = await findUser(username);
    if (foundUser)
      return NextResponse.json(
        { message: "User already exists." },
        { status: 201 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
