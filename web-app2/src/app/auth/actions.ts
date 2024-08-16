"use server";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  login,
} from "@/lib/users";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { welcomeTemplate } from "../../../templates/welcomeTemplate";
export async function signup(
  username: string,
  email: string,
  password: string
) {
  const foundUser = await findUserByUsername(username);
  if (foundUser) throw Error("username already exists.");

  const foundEmail = await findUserByEmail(email);
  if (foundEmail) throw Error("email already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({
    username,
    email,
    password: hashedPassword,
    communityId: "",
    photoURL: "",
  });
  await sendWelcomeEmail(username, email);
}

export async function handleLogin(username: string, password: string) {
  await login(username, password);
}

const sendWelcomeEmail = async (username: string, userEmail: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });
  try {
    await transporter.verify();
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      to: userEmail,
      subject: `Squadflow welcome email`,
      html: handleTemplate(username),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handleTemplate = (username: string) => {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    username,
  });
  return htmlBody;
};
