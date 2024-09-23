import { vi } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { execute } from "../test-data/faker/seeder-index";
import Community from "@//models/community";
import Workspace from "@/models/workspace";
import User from "@/models/user";
import Task from "@/models/task";
import { getUserAuthFromJWT } from "@/utils/helper";
let mongoServer: MongoMemoryServer;
import { getRedisClient } from "@/lib/redis-setup";
import { getWorkspaceParticipants } from "@/lib/workspace";
vi.mock("@/utils/helper");
export const { usersList, communitiesList, workspaceList, tasksList } =
  execute();

export const seedDatabase = async () => {
  await User.insertMany(usersList);
  await Community.insertMany(communitiesList);
  await Workspace.insertMany(workspaceList);
  await Task.insertMany(tasksList);
};

export const seedRedis = async () => {
  const client = await getRedisClient();

  for (const workspace of workspaceList) {
    const res = await getWorkspaceParticipants(workspace._id);
    await client.set(
      `workspace_${workspace._id.toString()}`,
      JSON.stringify(res)
    );
  }
};

export const setupTestEnvironment = async () => {
  vi.clearAllMocks();
  vi.mocked(getUserAuthFromJWT).mockResolvedValue({
    _id: usersList[0]._id.toString(),
    email: usersList[0].email.toString(),
    username: usersList[0].username,
    photoURL: usersList[0].photoURL,
    communityId: usersList[0].communityId,
  });

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  await seedDatabase();
  await seedRedis();
};

export const teardownTestEnvironment = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
