"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateAccessTokenFlat } from "@/lib/users";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { handleError } from "@/utils/helper";
import {
  handleCommunityCreation,
  handleCommunityExit,
  handleCommunityJoin,
} from "@/lib/community";
import User from "@/models/user";
import CustomError from "@/utils/CustomError";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

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
    console.log(communityId);
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
  const user = await User.findById(new ObjectId(payload?._id));
  if (!user) {
    throw new CustomError("user not found", 401);
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new CustomError("your password is incorrect", 401);
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne(
    { _id: new ObjectId(payload?._id) },
    { password: hashedPassword }
  );
};
