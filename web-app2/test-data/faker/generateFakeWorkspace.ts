import { faker, SimpleFaker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const generateFakeWorkspace = (
  communityId: ObjectId,
  createdBy: ObjectId,
  participants: { joined_at: Date; user: ObjectId }[]
) => {
  const labelsCount = faker.number.int({ min: 1, max: 5 });
  const customSimpleFaker = new SimpleFaker();

  return {
    _id: new mongoose.Types.ObjectId(),
    created_by: createdBy, // Assuming it's a reference to a User
    community: communityId, // Assuming it's a reference to a Community
    title: faker.company.catchPhrase(),
    participants: participants.map((item) => ({
      user: item.user,
      role: customSimpleFaker.helpers.arrayElement([
        "admin",
        "editor",
        "viewer",
      ]),
    })),
    columns: [
      { order: 1, title: "ongoing", color: "red" },
      { order: 2, title: "urgent", color: "red" },
      { order: 3, title: "completed", color: "red" },
    ],
    labels: Array.from({ length: labelsCount }).map(() => ({
      _id: new mongoose.Types.ObjectId(),
      color: "#ff0000",
      title: faker.commerce.productName(),
    })),
    progress: 0,
  };
};
