import { afterAll, beforeAll, describe, expect, test, vi, it } from "vitest";
import { faker } from "@faker-js/faker";
import { moveTask } from "../(app)/workspaces/[workspaceId]/helper";
import { MetaTaskResponse } from "@/utils/@types/task";
const generateMockTask = (): MetaTaskResponse => ({
  _id: faker.database.mongodbObjectId(),
  workspace: faker.database.mongodbObjectId(),
  title: faker.lorem.sentence(),
  columnId: faker.database.mongodbObjectId(),
  participants: Array.from({ length: 5 }, () => ({
    _id: faker.database.mongodbObjectId(),
    username: faker.internet.userName(),
    photoURL: faker.image.avatar(),
  })),
  labels: Array.from({ length: 3 }, () => ({
    _id: faker.database.mongodbObjectId(),
    color: faker.color.rgb({ format: "hex" }),
  })),
  commentsCount: faker.number.int({ min: 0, max: 20 }),
  dueDate: faker.date.soon().toISOString(),
});

const generateMockTasks = (count: number): MetaTaskResponse[] =>
  Array.from({ length: count }, () => generateMockTask());
describe("moveTask", () => {
  let tasks: MetaTaskResponse[] = [
    {
      _id: "task1",
      workspace: "workspace1",
      title: "Design Homepage",
      columnId: "column1",
      participants: [
        {
          _id: "user1",
          username: "john_doe",
          photoURL: "https://example.com/avatar1.png",
        },
        {
          _id: "user2",
          username: "jane_smith",
          photoURL: "https://example.com/avatar2.png",
        },
      ],
      labels: [
        { _id: "label1", color: "#FF5733" }, // Red
        { _id: "label2", color: "#33FF57" }, // Green
      ],
      commentsCount: 5,
      dueDate: "2024-10-01",
    },
    {
      _id: "task2",
      workspace: "workspace1",
      title: "Develop Backend API",
      columnId: "column2",
      participants: [
        {
          _id: "user3",
          username: "alice_jones",
          photoURL: "https://example.com/avatar3.png",
        },
        {
          _id: "user4",
          username: "bob_miller",
          photoURL: "https://example.com/avatar4.png",
        },
        {
          _id: "user5",
          username: "carol_lee",
          photoURL: "https://example.com/avatar5.png",
        },
      ],
      labels: [
        { _id: "label3", color: "#3357FF" }, // Blue
        { _id: "label4", color: "#FF33A5" }, // Pink
      ],
      commentsCount: 8,
      dueDate: "2024-10-15",
    },
    {
      _id: "task3",
      workspace: "workspace2",
      title: "QA Testing",
      columnId: "column3",
      participants: [
        {
          _id: "user6",
          username: "dave_clark",
          photoURL: "https://example.com/avatar6.png",
        },
      ],
      labels: [
        { _id: "label5", color: "#FF8C33" }, // Orange
      ],
      commentsCount: 3,
      dueDate: "2024-10-05",
    },
  ];

  it("should move the task to the new column when taskId matches", () => {
    const result = moveTask(tasks, tasks[0]._id, tasks[1].columnId);
    expect(result[0].columnId).toBe(tasks[1].columnId);
  });

  it("should move the task to the new column when taskId matches", () => {
    const result = moveTask(tasks, tasks[0]._id, tasks[0].columnId);
    expect(result[0].columnId).toBe(tasks[0].columnId);
  });

  // Returns the original task list when taskId does not match
  it("should return the original task list when taskId does not match", () => {
    const result = moveTask(tasks, tasks[0]._id, "newColumn");
    expect(result).toEqual(tasks);
  });
});
