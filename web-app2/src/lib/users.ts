import clientPromise, { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

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
    return user;
  } catch (error) {
    console.error("Error logging user:", error);
    throw error;
  }
}
// Read operation for users
async function findUser(username) {
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
    const users = User.find({}).toArray();
    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
}

export { createUser, login, listUsers, findUser };
