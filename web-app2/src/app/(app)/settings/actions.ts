"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateAccessTokenFlat } from "@/lib/users";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import {
  handleCommunityCreation,
  handleCommunityExit,
  handleCommunityJoin,
} from "@/lib/community";
import User from "@/models/user";
import CustomError from "@/utils/CustomError";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { promises as fs } from "fs";
import { uploadFile } from "@/lib/firebase";
import { put } from "@vercel/blob";

export const handleJoinCommunityForm = async (formData: {
  communityCode: string;
}) => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const user = await handleCommunityJoin(
    payload?._id as string,
    formData.communityCode as string
  );
  cookies().set({
    name: "jwt",
    value: generateAccessTokenFlat(user),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  revalidatePath("/settings");
};

export const handleLeaveCommunity = async (code: string) => {
  try {
    const token = cookies().get("jwt");
    if (!token) redirect("/auth");
    const { payload } = await verifyJWTToken(token.value);
    const message = await handleCommunityExit(payload?._id as string, code);
    revalidatePath("/settings");
    return message;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const handleCreateCommunity = async (form: { name: string }) => {
  try {
    const token = cookies().get("jwt");
    if (!token) redirect("/auth");
    const { payload } = await verifyJWTToken(token.value);
    const communityId = await handleCommunityCreation(
      payload?._id as string,
      form.name
    );
    communityId && revalidatePath("/settings");
    return communityId;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const handleChangePassword = async (
  password: string,
  newPassword: string
) => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const user = await User.findById(new ObjectId(payload?._id as string));
  if (!user) {
    throw new CustomError("user not found", 401);
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new CustomError("your password is incorrect", 401);
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne(
    { _id: new ObjectId(payload?._id as string) },
    { password: hashedPassword }
  );
};

export const handleChangeUserProfile = async (
  username: string,
  email: string
) => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  if (payload?.username === username && payload?.email === email) {
    throw new CustomError("you need to change some text fields", 401);
  }

  if (payload?.username !== username) {
    const user = await User.findOne({ username });
    if (user) {
      throw new CustomError("username already taken", 401);
    }
  }
  if (payload?.email !== email) {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      throw new CustomError("email already taken", 401);
    }
  }

  await User.updateOne(
    { _id: new ObjectId(payload?._id as string) },
    { username, email }
  );
  const newUserObject = {
    _id: payload?._id,
    username,
    email,
    communityId: payload?.communityId,
    photoURL: payload?.photoURL,
  };
  cookies().set({
    name: "jwt",
    value: generateAccessTokenFlat(newUserObject),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  revalidatePath("/settings");
};

export const saveProfileImg = async (formData: FormData) => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const userId = payload?._id as string;
  const file = formData.get("file") as File;
  const fileName = `${userId}.${file.type.split("/")[1]}`;
  const blob = await put(fileName, file, {
    access: "public",
  });
  const url = blob.url;
  await User.updateOne({ _id: new ObjectId(userId) }, { photoURL: url });
  const newUserObject = {
    _id: userId,
    username: payload?.username,
    email: payload?.email,
    communityId: payload?.communityId,
    photoURL: url,
  };
  cookies().set({
    name: "jwt",
    value: generateAccessTokenFlat(newUserObject),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  return url;
};
