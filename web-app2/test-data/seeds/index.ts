import { insertMockUsers } from "./users";
import { insertMockCommunities } from "./communities";
import mongoose from "mongoose";

// MongoDB connection URI
const MONGO_URI = "your_mongo_db_connection_uri";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
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

const execute = async () => {
  await dropDatabase();
  await insertMockUsers();
  await insertMockCommunities();
};

connectDB().then(() => execute().then(() => mongoose.disconnect()));
