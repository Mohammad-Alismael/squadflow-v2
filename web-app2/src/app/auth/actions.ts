"use server";

import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  login,
} from "@/lib/users";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { verifyJWTToken } from "@/lib/helper/route.helper";

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

export async function handleLogin(username: string, password: string) {
  await login(username, password);
}
