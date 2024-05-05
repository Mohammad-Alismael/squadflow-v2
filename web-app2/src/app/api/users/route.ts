import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, listUsers } from "@/lib/users";
const registerSchema = z.object({
  username: z.string().min(4).max(52),
  email: z.string().email("please Enter a valid email address"),
  password: z.string().min(6),
});
export async function GET(request: Request) {
  const users = await listUsers();
  // Do whatever you want
  return NextResponse.json(users, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: Request) {
  const body = await request.json();
  registerSchema.safeParse(body);
  const validation = registerSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  // await createUser(body);
  return NextResponse.json({ message: "user created!" }, { status: 200 });
}
