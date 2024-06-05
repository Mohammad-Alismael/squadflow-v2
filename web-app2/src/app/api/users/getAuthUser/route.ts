// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { findUserByUserId } from "@/lib/users";
export async function GET(request: Request) {
  const userId = request.headers.get("uid") as string;
  try {
    const user = await findUserByUserId(userId);
    return NextResponse.json(
      { username: user.username, email: user.email, photoURL: user.photoURL },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
