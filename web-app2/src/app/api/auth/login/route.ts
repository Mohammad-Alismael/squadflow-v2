import { NextResponse } from "next/server";
import { login } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    await login(username, password);
    return NextResponse.json(
      { message: "logged in successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
