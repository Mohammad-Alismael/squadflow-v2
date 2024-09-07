import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { execute } from "../test-data/faker/seeder-index";
import Community from "@//models/community";
import Workspace from "@/models/workspace";
import { findUserById } from "@/lib/users";
import User from "@/models/user";
import { getUserAuthFromJWT } from "@/utils/helper";
let mongoServer: MongoMemoryServer;
import { getRedisClient } from "@/lib/redis-setup";
import { fetchWorkspaceParticipants } from "./mocked-functions/fetchWorkspaceParticipants";
import { getWorkspaceParticipants } from "@/lib/workspace";
vi.mock("@/utils/helper");

describe("test (fetchWorkspaceParticipants) function", () => {
  const { usersList, communitiesList, workspaceList } = execute();

  beforeAll(async () => {
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

    // Connect mongoose to the in-memory database
    await mongoose.connect(uri, {
      autoIndex: true,
    });

    // Insert data before running the tests
    await seedDatabase();

    await seedRedis();
  }, 20000);

  const seedDatabase = async () => {
    // Insert the initial data into the in-memory database
    await User.insertMany(usersList);
    await Community.insertMany(communitiesList);
    await Workspace.insertMany(workspaceList);
  };
  const seedRedis = async () => {
    const client = await getRedisClient();

    for (const workspace of workspaceList) {
      const res = await getWorkspaceParticipants(workspace._id);
      await client.set(
        `workspace_${workspace._id.toString()}`,
        JSON.stringify(res)
      );
    }
  };
  afterAll(async () => {
    // Disconnect and stop the in-memory database
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  test("when details is true", async () => {
    expect(fetchWorkspaceParticipants).toBeInstanceOf(Function);
    const res = await fetchWorkspaceParticipants(
      workspaceList[0]._id.toString(),
      true
    );
    expect(res).length(4);
    const requestedUserId = res.find(
      (user) => user.user._id === usersList[0]._id.toString()
    );
    expect(requestedUserId).toBeUndefined();
  });
  test("when details is false", async () => {
    expect(fetchWorkspaceParticipants).toBeInstanceOf(Function);
    const res = await fetchWorkspaceParticipants(
      workspaceList[0]._id.toString(),
      false
    );
    expect(res).length(4);
    const requestedUserId = res.find(
      (user) => user.user._id === usersList[0]._id.toString()
    );
    expect(requestedUserId).toBeUndefined();
  });
});
