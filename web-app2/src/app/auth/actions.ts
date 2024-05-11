"use server";

import { createUser, findUserByEmail, findUserByUsername } from "@/lib/users";
import bcrypt from "bcryptjs";

export async function signup(
  username: string,
  email: string,
  password: string
) {
  const foundUser = await findUserByUsername(username);
  if (foundUser) throw Error("username already exists.");

  const foundUser2 = await findUserByEmail(email);
  if (foundUser2) throw Error("email already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({
    username,
    email,
    password: hashedPassword,
    communityId: "",
    photoURL: "",
  });
}
