import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
  workspaceList,
} from "./testSetup";
import { getMetaTasksByWorkspaceId, getTasksByWorkspaceId } from "@/lib/tasks";

describe("test (getMetaTasksByWorkspaceId) function", () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 20000);

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  test("get normal data", async () => {
    const workspace = workspaceList[0];
    const res = await getMetaTasksByWorkspaceId(workspace._id);
    res.map((item) => {
      expect(item.commentsCount).toBeDefined();
    });
  });
});
