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
import {
  createNewColumn,
  createWorkspaceLabel,
} from "@/utils/actions/workspace-actions";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  workspaceList,
} from "./testSetup";
vi.mock("@/utils/helper");

describe("test (createWorkspaceLabel) function", () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 20000);

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  test("create a new label successfully", async () => {
    const workspace = workspaceList[0];
    const data = {
      title: "newlabel",
      color: "#000",
    };
    expect(workspace.labels).length(workspace.labels.length);
    await createWorkspaceLabel(workspace._id.toString(), data);
    const res = await Workspace.findById(workspace._id);
    expect(res.labels).length(workspace.labels.length + 1);
  });
  test("create a new label unsuccessfully", async () => {
    const workspace = workspaceList[0];
    const data = {
      title: "",
      color: "#000",
    };

    async function getAsyncFunction() {
      try {
        await createWorkspaceLabel(workspace._id.toString(), data);
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    }
    await expect(() => getAsyncFunction()).rejects.toThrowError(
      "label title should not bbe empty"
    );
  });
});
