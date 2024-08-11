import User from "@/models/user";
import mongoose from "mongoose";
// Generate ObjectIds for users
const userObjectId1 = new mongoose.Types.ObjectId();
const userObjectId2 = new mongoose.Types.ObjectId();
const userObjectId3 = new mongoose.Types.ObjectId();
const userObjectId4 = new mongoose.Types.ObjectId();
const userObjectId5 = new mongoose.Types.ObjectId();

// Mock users with assigned ObjectIds
export const mockUsers = [
  {
    _id: userObjectId1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    photoURL: "https://example.com/photos/john.jpg",
    communityId: "community1",
  },
  {
    _id: userObjectId2,
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
    photoURL: "https://example.com/photos/jane.jpg",
    communityId: "community2",
  },
  {
    _id: userObjectId3,
    username: "mike_jones",
    email: "mike@example.com",
    password: "password123",
    photoURL: "https://example.com/photos/mike.jpg",
    communityId: "community3",
  },
  {
    _id: userObjectId4,
    username: "alice_wonder",
    email: "alice@example.com",
    password: "password123",
    photoURL: "https://example.com/photos/alice.jpg",
    communityId: "community4",
  },
  {
    _id: userObjectId5,
    username: "bob_builder",
    email: "bob@example.com",
    password: "password123",
    photoURL: "https://example.com/photos/bob.jpg",
    communityId: "community5",
  },
];

export const insertMockUsers = async () => {
  try {
    await User.insertMany(mockUsers);
    console.log("Mock users added successfully");
  } catch (error) {
    console.error("Error inserting mock users:", error);
  }
};
