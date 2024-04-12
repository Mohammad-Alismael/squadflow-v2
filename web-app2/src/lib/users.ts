import clientPromise, { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { IUser } from "@/utils/@types/user";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const dbName = "squadflow";

// Initialize MongoDB client
async function init() {
  await connectMongoDB();
}

// Create operation
async function createUser(user: IUser) {
  await init();
  try {
    const result = await User.create(user);
    console.log(`User inserted with _id: ${result}`);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
function generateAccessToken(user: IUser) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      communityId: user.communityId,
      photoURL: user.photoURL,
    },
    process.env.NEXTAUTH_SECRET,
    {
      expiresIn: "6h",
    }
  );
}
async function login(username: string, password: string) {
  await init();
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("user not found");
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error("incorrect user name or passoword");
    }
    cookies().set({
      name: "jwt",
      value: generateAccessToken(user),
      httpOnly: true,
      path: "/",
    });
    return user;
  } catch (error) {
    console.error("Error logging user:", error);
    throw error;
  }
}
// Read operation for users
async function findUser(username: string) {
  await init();
  try {
    const user = await User.findOne({ username }).select("_id");
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

async function updateUserCommunityId(userId: string, communityId: string) {
  await init();
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { communityId },
      { new: true }
    );
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

async function updateUserToken(user: IUser) {
  cookies().set({
    name: "jwt",
    value: generateAccessToken(user),
    httpOnly: true,
    path: "/",
  });
}

async function listUsers() {
  await init();
  try {
    const users = User.find({});
    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
}

export {
  createUser,
  login,
  listUsers,
  findUser,
  updateUserCommunityId,
  updateUserToken,
};
