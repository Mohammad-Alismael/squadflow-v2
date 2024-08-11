// Mock data for communities
import { mockUsers } from "./users";
import Community from "@/models/community";

const mockCommunities = [
  {
    name: "Community One",
    code: "CMT1",
    admin: mockUsers[0]._id,
    participants: [{ user: mockUsers[0]._id }, { user: mockUsers[1]._id }],
  },
  {
    name: "Community Two",
    code: "CMT2",
    admin: mockUsers[2]._id,
    participants: [{ user: mockUsers[2]._id }, { user: mockUsers[3]._id }],
  },
];

export const insertMockCommunities = async () => {
  try {
    // Update community references with actual user IDs
    mockCommunities[0].admin = mockUsers[0]._id;
    mockCommunities[0].participants[0].user = mockUsers[0]._id;
    mockCommunities[0].participants[1].user = mockUsers[1]._id;

    mockCommunities[1].admin = mockUsers[2]._id;
    mockCommunities[1].participants[0].user = mockUsers[2]._id;
    mockCommunities[1].participants[1].user = mockUsers[3]._id;

    // Insert communities
    await Community.insertMany(mockCommunities);
    console.log("Mock communities added successfully");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
};
