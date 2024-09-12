import mongoose from "mongoose";
import fs from "fs";
import User from "@/models/user";
import {
  flatUsers,
  smartGenerateData,
  TFakerUser,
} from "../faker/seeder-index";
import Community from "@/models/community";
import Workspace from "@/models/workspace";
import Task from "@/models/task";
import bcrypt from "bcryptjs";
import path from "node:path";
import { fileURLToPath } from "url";

// MongoDB connection URI
const dbName = "users500";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: dbName,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped successfully");
  } catch (error) {
    console.error("Error dropping database:", error);
    process.exit(1); // Exit process with failure
  }
};

export const execute = async () => {
  await dropDatabase();
  try {
    const { users, communities, workspaces, tasks } = smartGenerateData(
      25,
      500,
      24,
      50
    );
    const users_ = flatUsers(users);
    await saveUsersPasswords(users_);
    const a = await hashUsersPasswords(users_);
    await User.insertMany(a);
    await Community.insertMany(communities);
    await Workspace.insertMany(workspaces);
    await Task.insertMany(tasks);
    console.log("data added successfully");
    return users_;
  } catch (error) {
    console.error("Error inserting mock users:", error);
  }
};

export const hashUsersPasswords = (users: TFakerUser[]) => {
  const list = users.map(async (user) => ({
    ...user,
    password: await bcrypt.hash(user.password, 10),
  }));
  return Promise.all(list);
};
export const saveUsersPasswords = async (users: TFakerUser[]) => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Define the path to the file where passwords will be saved
    const filePath = path.join(__dirname, `${dbName}_passwords.txt`);

    // Create an array of strings to be written to the file
    const data = users
      .map((user) => `Username: ${user.username}, Password: ${user.password}`)
      .join("\n");

    // Write the data to the file asynchronously
    await fs.promises.writeFile(filePath, data, "utf8");

    console.log("Passwords saved successfully to", filePath);
  } catch (error) {
    console.error("Error saving passwords:", error);
  }
};

// connectDB().then(() => execute().then(() => mongoose.disconnect()));
