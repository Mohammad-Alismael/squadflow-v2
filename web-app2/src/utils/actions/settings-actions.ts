"use server";
import { findUserByUserId, generateAccessTokenFlat } from "@/lib/users";
import {
  getCommunityById,
  handleCommunityCreation,
  handleCommunityExit,
  handleCommunityJoin,
  init,
} from "@/lib/community";
import { isAdminUserId } from "@/lib/helper/community.helper";
import { getUserAuthFromJWT } from "@/utils/helper";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import User from "@/models/user";
import { ObjectId } from "mongodb";
import CustomError from "@/utils/CustomError";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";
import { WorkspaceParticipants } from "@/utils/@types/workspace";

export const fetchCommunity = async () => {
  const { _id: userId } = await getUserAuthFromJWT();
  const { communityId } = await findUserByUserId(userId);
  if (communityId === "") {
    return new Response(null, {
      status: 204,
    });
  }
  try {
    const communityFound = await getCommunityById(communityId as string);
    const isAdmin = isAdminUserId(communityFound.admin._id, userId as string);
    const participantsWithoutUserId = communityFound[
      "_doc"
    ].participants.filter(
      (participant: WorkspaceParticipants) =>
        participant.user._id.toString() !== userId
    );
    return {
      ...communityFound["_doc"],
      participants: participantsWithoutUserId,
      isAdmin,
      status: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
    };
  }
};

export const handleJoinCommunityForm = async (formData: {
  communityCode: string;
}) => {
  const payload = await getUserAuthFromJWT();
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
    const payload = await getUserAuthFromJWT();
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
    const payload = await getUserAuthFromJWT();
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
  const payload = await getUserAuthFromJWT();
  await init();
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
  await init();
  const payload = await getUserAuthFromJWT();
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
  await init();
  const payload = await getUserAuthFromJWT();
  const file = formData.get("file") as File;
  const userId = payload?._id as string;
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
