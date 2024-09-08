import {
  setupTestEnvironment,
  teardownTestEnvironment,
  workspaceList,
} from "./testSetup";
import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import { deleteWorkspaceLabel } from "@/utils/actions/workspace-actions";
import Workspace from "@/models/workspace";

describe("DeleteWorkspaceLabel", () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 20000);

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  test("delete successfully", async () => {
    const workspace = workspaceList[0];
    expect(workspace.labels).length(workspace.labels.length);
    const lastLabel = workspace.labels[workspace.labels.length - 1];
    await deleteWorkspaceLabel(
      workspace._id.toString(),
      lastLabel._id.toString()
    );
    const result = await Workspace.findById(workspace._id.toString());
    expect(result.labels).length(workspace.labels.length - 1);
  });
});
