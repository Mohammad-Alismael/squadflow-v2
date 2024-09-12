import { flatUsers, smartGenerateData } from "../test-data/faker/seeder-index";
import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import mongoose from "mongoose";
import { connectDB, execute } from "../test-data/seeds";

describe("SmartGenerateData", () => {
  test("Should be able to generate data", () => {
    const res = smartGenerateData();
    res.users.map((item) => {
      console.log(item.leader);
      const a = item.users.find((_) => _._id.equals(item.leader._id));
      console.log(a);
      expect(a).toBeDefined();
    });
  });
  test("Should be able to generate data2", () => {
    const res = smartGenerateData();
    // res.workspaces.forEach((workspace, index) => {
    //   const userIds = workspace.participants.map((_) => _.user);
    //   const userIds2 = res.communities[index].participants.map((_) => _.user);
    //   expect(userIds).to.deep.equal(userIds2);
    // });
    const userIds = res.workspaces[0].participants.map((_) => _.user);
    const userIds2 = res.communities[0].participants.map((_) => _.user);
    expect(userIds).to.deep.equal(userIds2);
  });
  test("run", () => {
    const res = smartGenerateData();
    console.log(res.tasks[0]);
  });
});
