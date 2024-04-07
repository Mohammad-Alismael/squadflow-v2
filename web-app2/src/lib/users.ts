import clientPromise, { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const dbName = "squadflow";

// Initialize MongoDB client
async function init() {
  await connectMongoDB();
}

// Create operation
async function createUser(user) {
  await init();
  try {
    const result = await User.create(user);
    console.log(`User inserted with _id: ${result}`);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.NEXTAUTH_SECRET, {
    expiresIn: "6h",
  });
}
async function login(username: string, password: string) {
  await init();
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return null;
    }
    cookies().set({
      name: "jwt",
      value: generateAccessToken({ id: user._id, email: user.email }),
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

export { createUser, login, listUsers, findUser };
