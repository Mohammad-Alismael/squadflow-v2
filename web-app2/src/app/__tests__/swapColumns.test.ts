import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import { swapColumns } from "@/app/(app)/workspaces/[workspaceId]/helper";
import { ObjectId } from "mongodb";
import { WorkspaceColumn } from "@/utils/@types/workspace";

describe("swapColumns", () => {
  const columns = [
    { _id: new ObjectId().toString(), title: "ongoing", order: 1 },
    { _id: new ObjectId().toString(), title: "urgent", order: 2 },
    { _id: new ObjectId().toString(), title: "done", order: 3 },
  ] as WorkspaceColumn[];
  const columnToMove = columns[1];
  const res = swapColumns(columns, columnToMove._id, columns[2].order);
  expect(res).toHaveLength(columns.length);
  const movedColumn = res.find((column) => column._id === columnToMove._id);
  console.log(movedColumn);
  // expect(movedColumn).toBeDefined();
  // expect(movedColumn.order).toEqual(columns[2].order);
});
