import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUser } from "@/lib/users";
import { z } from "zod";
const postSchema = z.object({
  username: z.string().refine((username) => typeof username === "string", {
    message: "username should be a string",
  }),
  email: z.string().email("email should be a string"),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  postSchema.safeParse({ username, email, password });
  const validation = postSchema.safeParse({ username, email, password });
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  try {
    const foundUser = await findUser(username);
    if (foundUser)
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      username,
      email,
      password: hashedPassword,
      communityId: "",
      photoURL: "",
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
