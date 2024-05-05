import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { IUser } from "@/utils/@types/user";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const dbName = "mobile-app";

// Initialize MongoDB client
async function init() {
  await connectMongoDB();
}

// Create operation
async function createUser(user: {
  username: string;
  email: string;
  password: string;
  communityId: string;
  photoURL: string;
}) {
  await init();
  try {
    const result = await User.create(user);
    console.log(`User inserted with _id: ${result}`);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
// @ts-ignore
function generateAccessToken(user: User) {
  console.log({
    _id: user._id,
    email: user.email,
    communityId: user["_doc"].communityId,
    photoURL: user.photoURL,
  });
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      communityId: user["_doc"].communityId,
      photoURL: user.photoURL,
    },
    process.env.NEXTAUTH_SECRET as string,
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
      throw new Error("incorrect user name or password");
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

async function checkUserIdsExist(userIds: string[]): Promise<boolean> {
  try {
    const users: IUser[] = await User.find({ _id: { $in: userIds } });
    const existingUserIds: Set<string> = new Set(
      users.map((user) => user._id.toString())
    );
    const missingUserIds: string[] = userIds.filter(
      (userId) => !existingUserIds.has(userId)
    );

    if (missingUserIds.length === 0) {
      console.log("All user IDs exist in the User collection");
      return true;
    } else {
      console.log("Missing user IDs:", missingUserIds);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export {
  createUser,
  login,
  listUsers,
  findUser,
  updateUserCommunityId,
  updateUserToken,
  checkUserIdsExist,
};
