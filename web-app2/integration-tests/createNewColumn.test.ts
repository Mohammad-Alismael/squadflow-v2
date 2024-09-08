import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { execute } from "../test-data/faker/seeder-index";
import Community from "@//models/community";
import Workspace from "@/models/workspace";
import User from "@/models/user";
import { getUserAuthFromJWT } from "@/utils/helper";
let mongoServer: MongoMemoryServer;
import { getRedisClient } from "@/lib/redis-setup";
import { getWorkspaceParticipants } from "@/lib/workspace";
import { createNewColumn } from "@/utils/actions/workspace-actions";
vi.mock("@/utils/helper");

describe("test (createNewColumn) function", () => {
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

  test("create a new column successfully", async () => {
    const workspace = workspaceList[0];
    const newColumn = {
      title: "newColumnTitle",
      order: 4,
      color: "#000",
    };
    await createNewColumn(workspace._id.toString(), newColumn);
    const res = await Workspace.findById(workspace._id);
    expect(res.columns).length(4);
    expect(res.columns[3]).toBeDefined();
    expect(res.columns[3].order).to.equal(newColumn.order);
    expect(res.columns[3].title).to.equal(newColumn.title);
  });

  test("create a new column unsuccessfully with title", async () => {
    const workspace = workspaceList[0];
    const newColumn = {
      title: "urgent",
      order: 4,
      color: "#000",
    };

    async function getAsyncFunction() {
      try {
        const res = await createNewColumn(workspace._id.toString(), newColumn);
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    }
    await expect(() => getAsyncFunction()).rejects.toThrowError(
      "column is already created"
    );
  });
  test("create a new column unsuccessfully with order", async () => {
    const workspace = workspaceList[0];
    const newColumn = {
      title: "urgent_too",
      order: 3,
      color: "#000",
    };

    async function getAsyncFunction() {
      try {
        const res = await createNewColumn(workspace._id.toString(), newColumn);
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    }
    await expect(() => getAsyncFunction()).rejects.toThrowError(
      "order column is incorrect"
    );
  });
});
